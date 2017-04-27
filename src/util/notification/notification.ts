import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { Platform, AlertController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { MidataPersistence } from '../../util/midataPersistence'
import { Settings } from '../../util/settings';
import { LocalNotifications } from 'ionic-native';
import * as MiwadoTypes from '../../util/typings/MIWADO_Types';

declare var FCMPlugin;

/*
* Class NotificationService
* This class all the stuff that needs to be done to
* - get a token to notify
* - save a token to notify
* - retreives tokens to notify
* - notifies
*
* This class needs the MidataPersistence class,
* Settings class and the MIWADO_Types!
*
* Version:    1.0 Test Version
* Author(s):  isels1, zyssm4
* Date:       Builded 24.03.2017
*/
@Injectable()
export class NotificationService {

  private notificationsSubj = new Subject<MiwadoTypes.Notification>();
          notifications: Observable<MiwadoTypes.Notification> = this.notificationsSubj.asObservable();
  private settings = Settings.getInstance(this.platform, this.storage);
  private mp = MidataPersistence.getInstance();
  private listenerSubscriptions: any[] = [];
  private didSetup = false;

  // Flag to indicate whether the service currently tries to update the token
  // on the MIDATA server. If that's the case there should be no other update
  // since otherwise the service might create multiple copies of the token!
  private updateUserTokenInProgress = false;

  // The firebase cloud messaging API object (obtained through
  // cordova-plugin-fcm). Be sure to add the necessary config files to the
  // application root. These files are platform-specific and can be
  // downloaded from the Firebase console webapp on their website.
  private fcm: any;

  constructor(private platform: Platform,
              private storage: Storage,
              private http: Http,
              private alertCtrl: AlertController){

    window['not'] = this;
    this.notifications.subscribe(n => {
        console.log('Received notification: ', JSON.stringify(n));
    });
  }

  initNotification(){
    this.cancelListenerSubscriptions();
    this.platform.ready().then((ret) => {
      if(this.platform.is('mobile') && this.mp.getRole() == 'member') {
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

  storeFCMTokenMIDATA(token: string, update: boolean) : Promise<MiwadoTypes.FCMToken_Device> {
    return this.settings.getUser().then((user) => {
      let userId = user.auth.owner;
        var tk = {
          resourceType: "Device",
          lotNumber: token,
          type: { 'type': 'FCMToken'},
          status: 'available',
          manufacturer: userId
        } as MiwadoTypes.FCMToken_Device;
        this.saveFCMTokenMIDATA(tk).then((token) => {
          return tk;
        });

    });
  }

  saveFCMTokenMIDATA(tk: any){
    return this.mp.save(tk).then((result) =>{
       console.log('token saved');
       console.log(result);
     }).catch((error) => {
       console.log('ERROR: ' + error);
     });
  }

  deleteFCMTokenMIDATA(patId: string){
    console.log('patId to delete token from: ' + patId);
    return this.getFCMTokenToNotifyMIDATA(patId).then((userTokenFound) => {
      let deleted = new Promise((resolve, reject) => {
        this.fcm.getToken((token: string) => {
          for(var i = 0; i < userTokenFound.length; i++) {
            let userTokenToDelete = userTokenFound[i] && token == userTokenFound[i].lotNumber;
            if(userTokenToDelete) {
              console.log('token to delete found:');
              console.log(userTokenFound[i]);
              //this.mp.delete();
            }
          }
        });
      });
    });
  }

  getFCMTokenToNotifyMIDATA(patId: string){
    console.log(patId);
    var tokens = new Array<any>();
    return this.mp.search('Device').then((res) => {
      for (var i = 0; i < res.length; i++) {
        console.log('token to notify is here???')
        console.log(res[i]);
        if (res[i].manufacturer == patId) {
          tokens.push(res[i]);
        }
      }
      return tokens;
    });
  }

  notify(message: MiwadoTypes.Notification, receiverToken: MiwadoTypes.FCMToken_Device) {
    let encryptedMessage = this.encrypt(message);
    let payload = JSON.stringify({
        // Target apps running in background or closed
        priority: 'high',
        // Receiver token
        to: receiverToken.lotNumber,
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
                console.log("TOKKKEEEEEN");
                console.log(userToken);

                let userTokenFound = userToken.length !== 0;
                var userTokenNewDevice = true;

                for(var i = 0; i < userToken.length; i++) {
                  if (userTokenFound && userToken[i].lotNumber == token) {
                    userTokenNewDevice = false;
                  }
                }

                // If no token found at all, save a new token
                // If another token than already saved, save again a new device!
                if (!userTokenFound) {
                  if(this.mp.getRole() != 'provider') {
                    resolve(this.storeFCMTokenMIDATA(token, false));
                  }
                } else if (userTokenNewDevice) {
                  if(this.mp.getRole() != 'provider') {
                    resolve(this.storeFCMTokenMIDATA(token, true));
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
          LocalNotifications.schedule({
            id: 1,
            text: message.title,
            data: { secret: message.title },
            icon: './assets/img/logo.png'
          });

          /*let alert = this.alertCtrl.create({
            title: message.title,
            subTitle: message.title,
            buttons: ['OK']
          });

          alert.present();*/
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
        var tk = new Array<any>();
        for(var i = 0; i < tokens.length; i++) {
          var owner = tokens[i].manufacturer;
          if(tokens[i].manufacturer == userId) {
            tk.push(tokens[i]);
          }
        }
        if (!tk) {
            console.log('WARNINING: No token found for user: ' + userId);
        } else {
            console.log(`Token for user ${userId} found: ${tk}`);
        }
        return tk;
      });
  }
}
