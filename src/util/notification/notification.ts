import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Settings } from '../../util/settings';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { MidataPersistence } from '../../util/midataPersistence'

import * as MiwadoTypes from '../../util/typings/MIWADO_Types';

declare var FCMPlugin;

@Injectable()
export class NotificationService {

  private notificationsSubj = new Subject<MiwadoTypes.Notification>();
  notifications: Observable<MiwadoTypes.Notification> = this.notificationsSubj.asObservable();

  private settings = Settings.getInstance(this.platform, this.storage);
  private mp = MidataPersistence.getInstance();

  // Flag to indicate whether the service currently tries to update the token
  // on the MIDATA server. If that's the case there should be no other update
  // since otherwise the service might create multiple copies of the token!
  private updateUserTokenInProgress = false;

  private listenerSubscriptions: any[] = [];
  private didSetup = false;

  // The firebase cloud messaging API object (obtained through
  // cordova-plugin-fcm). Be sure to add the necessary config files to the
  // application root. These files are platform-specific and can be
  // downloaded from the Firebase console webapp on their website.
  private fcm: any;

  constructor(private platform: Platform,
              private storage: Storage,
              private http: Http){

    window['not'] = this;

    this.notifications.subscribe(n => {
        console.log('Received notification: ', JSON.stringify(n));
    });
  }

  initNotification(){
    this.cancelListenerSubscriptions();
    this.platform.ready().then((ret) => {
      if(this.platform.is('mobile')) {
        this.mobileSetup();
        this.didSetup = true;
      } else {
        this.didSetup = false;
      }
    }).then(() => {
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

  storeFCMTokenMIDATA(token: string) : any {
    this.settings.getUser().then((user) => {
      let userId = user.auth.owner;
      var tk = {
        lotNumber: token,
        type: 'FCMToken',
        status: 'available',
        manufacturer: userId
      }

      this.mp.save(tk).then((result) =>{
        console.log('token saved');
        console.log(result);
      }).catch((error) => {
        console.log('ERROR: ' + error);
      });

      return tk;
    });
  }

  getFCMTokenToNotifyMIDATA(){

  }

  notify() {

  }

  /*
   * Get the token for this user to check whether it is
   * still up to date with the token received from the FCM service (`token`).
   * If not, we have to save the new one on the server.
   */
  private updateUserToken(): Promise<boolean> {
      // Check if another updateUserToken is already in progress
      if (this.updateUserTokenInProgress) {
          console.log('updateUserToken() already in progress, aborting');
          return Promise.resolve(false);
      }
      this.updateUserTokenInProgress = true;

      // If not, call the getToken method of the FCM Service to get a token
      // for the current user. Save that token on the server and try to send the
      // message to the receiver.
      let token = new Promise((resolve, reject) => {
        this.settings.getUser().then((usr) => {
          let userId = usr.auth.owner;
          this.fcm.getToken((token: string) => {
            if(!token) {
              reject('You got no Token from FCM');
            } else {
              this.getTokenForUser(userId).then((userToken) => {
                // Check if token is present or wasn't found at all.
                let userTokenFound = userToken !== undefined;
                let userTokenChanged = userTokenFound && token !== userToken.lotNumber;
                // If no token found at all, save a new token
                if (!userTokenFound) {
                  if(this.mp.getRole() != 'provider') {
                    resolve(this.storeFCMTokenMIDATA(token));
                  }
                } else if (userTokenChanged) {
                  if(this.mp.getRole() != 'provider') {
                    resolve(this.storeFCMTokenMIDATA(token));
                  }
                } else {
                    resolve(userToken);
                }
              }).catch(error => {
                  reject('Error when getting user token: ' + error);
              });
            }
          });
        });
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
  private onNotify = (data: MiwadoTypes.FCMNotificationData) => {
      console.log('On notify');
      console.log(JSON.stringify(data));
      if (data.secure) {
          let message: MiwadoTypes.Notification = this.decrypt(data.secure);
          this.notificationsSubj.next(<MiwadoTypes.Notification> message);
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
   * On some occasions the token can be reset by the server.
   * In such cases this callback will be called that should then
   * update the token for this user on MIDATA.
   */
  private onTokenRefresh = (newToken: string) => {
      console.log('onTokenRefresh called!');
      this.updateUserToken();
  };

  /**
   * Encrypt a notification payload using a helper's public
   * key that has been stored on MIDATA.
   * TODO: Do actual encryption
   */
  private encrypt(message: MiwadoTypes.Notification): string {
      return JSON.stringify(message);
  }

  /**
   * Decrypt a notification payload using this user's private key that has
   * been stored on MDIATA.
   * TODO: Do actual decryption
   */
  private decrypt(message: string): MiwadoTypes.Notification {
      return <MiwadoTypes.Notification> JSON.parse(message);
  }

  /**
   * Get the FCMToken for a given user from MIDATA.
   * If no token is found, the wrapped value will be null instead of an
   * FCMToken object.
   */
  private getTokenForUser(userId: string): Promise<any> {
      console.log('get Token for user');
      return this.mp.retreiveFCMToken().then((tokens) => {
        var tk:any;
        for(var i = 0; i < tokens.length; i++) {
          var owner = tokens[i].manufacturer;
          owner = owner.replace("Patient/", "");
          owner = owner.replace("Practitioner/", "");
          if(tokens[i].manufacturer == userId) {
            tk = tokens[i];
          }
        }
        if (!tk) {
            console.log('WARNINING: No token found for user: ' + userId);
        } else {
            console.log(`Token for user ${userId} found: ${tk.lotNumber}`);
        }
        return tk;
      });
  }
}
