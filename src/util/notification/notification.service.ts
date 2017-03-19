import { AsyncSubject } from 'rxjs/AsyncSubject';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LocalNotifications } from 'ionic-native';
import { UserService } from '../user';
import { Platform } from 'ionic-angular';
import { FCMToken } from './fcm-token';
import { FCMTokenDao } from './fcm-token-dao';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { ResourceService } from '../resource.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as firebase from 'firebase';  // Used for non-tablet web app FCM

import { Settings } from '../../../util/settings';

declare const FCMPlugin;


/**
 *  Structure of a notification after all the decryption and unwrapping
 *  has been done.
 */
export interface Notification {
    title: string;
    type: string;
    payload?: any;
}


/** Structure of a notification payload sent via FCM */
export interface FCMNotificationData {
    // The encrypted inner payload. A stringified and encrypted object
    // of type `Notification`.
    secure?: string;
    // If the notification was tapped in the
    // OS' notification center.
    wasTapped?: boolean;
}

/**
 * A service to provide functionality to send messages to other devices.
 * This service makes use of Google Firebase Cloud Messaing (FCM).
 * Each device is associated with a registration token that is created by the
 * FCM service and received by this service when sending a message.
 * The class FCMToken wraps this token and is stored on MIDATA as a FHIR Observation.
 * Whenever the token changes, this resource should be updated.
 * Currently, this service is only available for mobile platforms.
 */
@Injectable()
export class NotificationService_ {

    private notificationsSubj = new Subject<Notification>();
    private settings = Settings.getInstance(this.platform, this.storage);

    // Flag to indicate whether the service currently tries to update the token
    // on the MIDATA server. If that's the case there should be no other update
    // since otherwise the service might create multiple copies of the token!
    private updateUserTokenInProgress = false;

    // A stream of notifications that can be subscribed to by other parts of the app.
    notifications: Observable<Notification> = this.notificationsSubj.asObservable();

    // The firebase cloud messaging API object (obtained through
    // cordova-plugin-fcm). Be sure to add the necessary config files to the
    // application root. These files are platform-specific and can be
    // downloaded from the Firebase console webapp on their website.
    private fcm: any;

    private listenerSubscriptions: any[] = [];

    // If the service has been setup, every call to send etc.
    // should not go through if this is not the case.
    private didSetup = false;

    constructor(
            private platform: Platform,
            private tokenDao: FCMTokenDao,
            private dao: FCMTokenDao,
            private http: Http,
            private storage: Storage) {
        window['not'] = this;

        this.notifications.subscribe(n => {
            console.log('Received notification: ', JSON.stringify(n));
        });
    }

    /**
     * Initializing this service involves saving the most recent token for
     *
     * this user on the server.
     * There is no need to sync all tokens since the most recent tokens are fetched
     * on every NotificationService#send call.
     * This service needs to be inited before services that make use of
     * NotificationService#listen!
     */
    init() {
        this.cancelListenerSubscriptions();
        this.platform.ready()
        .then(() => {
            if (this.platform.is('mobile')) {
                this.mobileSetup();
                this.didSetup = true;
            } else {
                // this.webSetup();
                this.didSetup = false;
            }
        })
        .then(() => {
            if (this.didSetup) {
                return this.updateUserToken()
                .then(() => {
                    return true;
                });
            } else {
                console.log('Not setup, skipping getting and saving of token');
                return Promise.resolve(true);
            }
        });
    }

    /**
     * Cancel subscriptions of previous calls to `listen`.
     * This function has to be called when (re)initializing the service
     * since otherwise the callbacks to be executed on certain notifications
     * are registered multiple times.
     */
    private cancelListenerSubscriptions() {
        this.listenerSubscriptions.forEach(sub => {
            console.log('Cancel notification listener');
            sub.unsubscribe();
        });
        this.listenerSubscriptions = [];
    }

    /**
     * Called whenever the app receives a notification from FCM.
     */
    private onNotify = (data: FCMNotificationData) => {
        console.log('On notify');
        console.log(JSON.stringify(data));
        if (data.secure) {
            let message: Notification = this.decrypt(data.secure);
            this.notificationsSubj.next(<Notification> message);
        } else {
            console.log('Unknown notification from FCM');
            console.log(data);
        }

        if (data.wasTapped) {
            // Notification was received on device tray and tapped by the user
        } else {
            // Notification was received while in app
        }
    }

    /**
     * Get the FCMToken for a given user from MIDATA.
     * If no token is found, the wrapped value will be null instead of an
     * FCMToken object.
     */
    private getTokenForUser(userId: string): Promise<FCMToken> {
        console.log('get Token for user');
        /*return this.dao.get().then(allTokens => {
            // Take only the most recent token for each user
            let tokens = _(allTokens)
                .groupBy('user')
                .values()
                .map(xs => _.orderBy(xs, 'timestamp', 'desc'))
                .map(xs => xs[0])
                .value();
            // Try to get the token for the requested user
            let tk = tokens.find(t => t.user === userId);
            if (!tk) {
                console.log('WARNINING: No token found for user: ' + userId);
            } else {
                console.log(`Token for user ${userId} found: ${tk.token}`);
            }
            return tk;
        });*/
        return null;
    }

    /**
     * On some occasions the token can be reset by the server.
     * In such cases this callback will be called that should then
     * update the token for this user on MIDATA.
     */
    private onTokenRefresh = (newToken: string) => {
        console.log('onTokenRefresh called!');
        this.updateUserToken();
    };

    /**
     * Save a string token received from the FCM server.
     * If there is a FCMToken passed as the second argument that
     * token will be updated.
     */
    private saveToken(newToken: string, currentToken?: FCMToken): Promise<FCMToken> {
        let tk;
        if (currentToken) {
            console.log(`Update token with id ${currentToken.id}!`);
            tk = currentToken.withToken(newToken);
            return tk;
        } else {
            console.log('Save new token: ', newToken);
            this.settings.getUser().then((user) => {
              tk = new FCMToken({
                  token: newToken,
                  user: user.auth.owner
              });
              return tk;
            });
        }
        //return null//TODO: this.dao.save(tk);
    }

    /**
     * Setup the notification system for web browsers.
     * TODO: Not working! There seems to be an issue with the service worker.
     */
    private webSetup() {
        // let config = {
        //     apiKey: "AIzaSyDX6X_tTl2OGtRPEVpkXD9vBWtYSCUGTis",
        //     authDomain: "karegenda-ff31f.firebaseapp.com",
        //     databaseURL: "https://karegenda-ff31f.firebaseio.com",
        //     storageBucket: "karegenda-ff31f.appspot.com",
        //     messagingSenderId: "271832396113"
        // };
        // firebase.initializeApp(config);

        // this.fcm = firebase.messaging();
        // this.fcm.onTokenRefresh(this.onTokenRefresh);
        this.fcm = {
            getToken: func => {
                func('this is a test token');
            }
        }
    }

    /**
     * Setup notification callbacks etc. for mobile setups (tablets and
     * phones).
     */
    private mobileSetup() {
        this.fcm = FCMPlugin;
        this.fcm.onNotification(
            this.onNotify,
            (msg) => {
                console.log('onNotification callback successfully registered: ' + msg);
            },
            (err) => {
                console.log('Error registering onNotification callback: ' + err);
            }
        );
        this.fcm.onTokenRefresh(this.onTokenRefresh);
    }

    /**
     * Encrypt a notification payload using a helper's public
     * key that has been stored on MIDATA.
     * TODO: Do actual encryption
     */
    private encrypt(message: Notification): string {
        return JSON.stringify(message);
    }

    /**
     * Decrypt a notification payload using this user's private key that has
     * been stored on MDIATA.
     * TODO: Do actual decryption
     */
    private decrypt(message: string): Notification {
        return <Notification> JSON.parse(message);
    }

    private sendWithToken(message: Notification, receiverToken: FCMToken): Promise<string> {
        let encryptedMessage = this.encrypt(message);
        let payload = JSON.stringify({
            // Target apps running in background or closed
            priority: 'high',
            // Receiver token
            to: receiverToken.token,
            // to: "/topics/all",
            notification:{
                title: 'MIWADO',
                body: message.title,
                sound: 'default',
                // Open app when app is closed
                click_action: 'FCM_PLUGIN_ACTIVITY',
                icon: '/assets/img/logo.png'
            },
            // Data to be received by app notification handler
            data: {
                secure: encryptedMessage
            }
        });
        let link = 'https://fcm.googleapis.com/fcm/send';
        let headers = new Headers();
        // TODO: This server key is taken from the Firebase console at
        // https://console.firebase.google.com/project/karegenda-ff31f
        // under Settings > Cloud Messagning > Project Credentials
        // It should be quite easy to get this key from the headers of
        // outgoing requests. If somebody has this key he can send
        // messages to user devices given that he ALSO KNOWS THEIR
        // DEVICE TOKEN.
        // *** OR ***
        // If devices are NOT UNSUBSCRIBED FROM `/topics/all` the user
        // that extracted the server key CAN SEND NOTIFICATIONS TO
        // THOSE DEVIES EVEN WITHOUT KNOWING THE DEVICE TOKENS.
        // ***
        // These messages should be sent from an app server to the FCM
        // server.
        let serverKey = 'AAAA6pkf4Ws:APA91bFyBztIfFhX5CkhRnvWYCFd69EGJVVi6FplFVeUGOpyRET8q4gmFknFZw8aJVj7D1YUdzAPt4S3okJJaNsFcS7yq8dm26q_W1khkpybCEP_8eZV1PVWQQ8mXHvXUdpUyQ4k7qJO';
        // Currently only the legacy key works, why's that?
        let legacyServerKey = 'AIzaSyDK1LOucWUaiU4RCUZgdEL2L5YED2ku-Vk';
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'key=' + legacyServerKey);

        return new Promise((resolve, reject) => {
            this.http.post(link, payload, { headers })
            .subscribe(response => {
                resolve('Success');
            }, error => {
                reject('Error while sending message: ' + error);
            });
        });
    }

    /*
     * Get the token for this user to check whether it is
     * still up to date with the token received from the FCM service (`token`).
     * If not, we have to save the new one on the server.
     */
    private updateUserToken(): Promise<boolean> {
        // Check if another updateUserToken is already in progress
        if (this.updateUserTokenInProgress) {
            console.log('updateUserToken() in progress, aborting');
            return Promise.resolve(false);
        }

        this.updateUserTokenInProgress = true;

        // If not, call the getToken method of the FCM Service to get a token
        // for the current user. Save that token on the server and try to send the
        // message to the receiver.
        let token = new Promise((resolve, reject) => {
          //TODO:::
          /*  let userId = this.user.currentUser.id; // this user's id
            this.fcm.getToken(
                (token: string) => {
                    if (!token) {
                        reject('No token received from the FCMService, what\'s going on?');
                    } else {
                        // Get token for the current user
                        this.getTokenForUser(userId)
                        .then(userToken => {
                            // Check if token is present or wasn't found at all.
                            let userTokenFound = userToken !== undefined;
                            let userTokenChanged = userTokenFound && token !== userToken.token;
                            // If no token found at all, save a new token
                            if (!userTokenFound) {
                                resolve(this.saveToken(token));
                            // If found existing token, update the token
                            } else if (userTokenChanged) {
                                resolve(this.saveToken(token, userToken));
                            // If found, return the current token
                            } else {
                                resolve(userToken);
                            }
                        })
                        .catch(error => {
                            reject('Error when getting user token: ' + error);
                        });
                    }
                },
                // There was an error with the FCM service
                (error) => {
                    reject('There was an error with the FCM service: ' + error);
                }
            );*/
        });

        // Make sure to set the flag back to false.
        return token.then(tk => {
            this.updateUserTokenInProgress = false;
            return true;
        }).catch(error => {
            console.log('updateUserToken error: ' + error);
            this.updateUserTokenInProgress = false;
            return false;
        });
    }

    /**
     * Send a message to a number of helpers.
     * If the second argument is not given, the message is sent
     * to all helpers.
     * @param message The message to send
     * @param receivers A list of receiver ids
     */
    broadcast(message: Notification, receivers?: string[]) {
        if (receivers !== undefined) {
            receivers.forEach(r => {
                this.send(message, r);
            });
        } else {
          /*  this.helperService.helpers.take(1).subscribe(helpers => {
                helpers.forEach(helper => {
                    this.send(message, helper.id);
                });
            });*/
        }
    }

    /**
     * Send an encrypted message to another device.
     * @param message The payload to send
     * @param receiver The user id belonging to the other device.
     * @return Observable<string> An observable that either emits a success
     *         message or an error message.
     */
    send(message: Notification, receiver: string): Promise<string> {
        console.log('Send notification: ' + JSON.stringify(message));

        if (!this.didSetup) {
            return;
        }

        // First get and save this user's token
        return this.updateUserToken()
        .then(() => {
            // Now get the token for the receiving user
            return this.getTokenForUser(receiver);
        })
        .then(receiverToken => {
            // Finally, send the message to the receiving user.
            if (receiverToken) {
                return this.sendWithToken(message, receiverToken);
            } else {
                return Promise.reject("No token found for receiving user: " + receiver);
            }
        })
        .then(status => {
            console.log('Status: ' + status);
            return status;
        })
        .catch(error => {
            console.log('Error when sending notification: ' + error);
            return Promise.reject(
                'There was an error when trying to send the notification message: ' + error
            );
        });
    }

    /**
     * Send a message to the user himself. This will simply publish the notification
     * locally. This way the user can `listen` for messages as if they
     * come from another device.
     */
    publish(message: Notification) {
        this.notificationsSubj.next(message);
    };

    /**
     * Listen for notifications of a given type and execute a function.
     */
    listen(notificationType: string, func: (n: Notification) => void) {
        console.log('Setup notification listener');
        let subscription = this.notifications
        //TODO:::
        //.filter(n => n.type === notificationType)
        .subscribe(n => {
            func(n);
        });
        this.listenerSubscriptions.push(subscription);
    }

}
