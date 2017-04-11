import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as MiwadoTypes from './typings/MIWADO_Types';
import * as MidataTypes from './typings/MIDATA_Types';

/*
* Class Settings
* This class stores and retreives the settings.
* They are stored in the secure storage.
*
* The settings to store and retreive are:
* - language
* - user
* - credentials
* - group
*
* Version:    1.0 Test Version
* Author(s):  isels1, zyssm4
* Date:       Builded 24.03.2017
*/
export class Settings {

  private static s:Settings;
  private lang: string;
  private storeCredentials = false;
  private user: MiwadoTypes.MIWADO_User;
  private group : any;

  private constructor(private platform: Platform, private storage: Storage){
      if(platform.is('ios') && platform.is('mobile')) {
        this.setLanguage(window.navigator.language)
      }
      this.user = {
        username: '',
        password: '',
      } as MiwadoTypes.MIWADO_User;
  }

  /* Public static getInstance()
  * This method gets the instance of the class. If no instance exists,
  * it will create a new one.
  */
  public static getInstance(p: Platform, st: Storage) {
    if (this.s == null){
      this.s = new Settings(p, st);
    }
    return this.s;
  }

  /* setLanguage(l: string)
  * This method sets the language to the variable "l".
  * "l" can contain one of the following strings:
  * - "de" (for German)
  * - "fr" (for France)
  * - "en" (for English)
  */
  setLanguage(l: string) {
    if (l == 'de') {
      this.lang = 'de';
    } else if (l == 'fr') {
      this.lang = 'fr';
    } else if (l == 'en') {
      this.lang = 'en';
    } else {
      this.lang = 'de';
    }
  }

  /* getLanguage(): string
  * This method returns the current selected language as string.
  * Return value could be one of the following:
  * - "de" (for German)
  * - "fr" (for France)
  * - "en" (for English)
  */
  getLanguage(): string {
    return this.lang;
  }

  /* setUser(un: string, pw: string, auth?: any)
  * This method saves the user into the local storage.
  * Format of saved user is MIWADO_Types.MIWADO_User.
  * Parameters are:
  * - un: The usermane
  * - pw: The password
  * - auth?: The auth token from midata
  *
  * Returns promise from storage.
  */
  setUser(un: string, pw: string, auth?: any) {
    if(this.user == null) {
      this.user = {
        username: '',
        password: '',
      } as MiwadoTypes.MIWADO_User;
    }

    this.user.username = un;
    this.user.password = pw;
    this.user.auth = <MidataTypes.MIDATA_authResponse> auth;

    return this.storage.set('user', JSON.stringify(this.user));
  }

  /* getUser()
  * This method returns the stored user object from
  * the secure storage of the device as a promise.
  *
  * Format of returned value in promise is MIWADO_Types.MIWADO_User.
  */
  getUser() {
    return this.storage.get('user').then((user) => {
      this.user = JSON.parse(user);
      return this.user;
    });
  }

  /* setStoreCred(b: boolean)
  * This method sets the boolean, if the credentials
  * should be stored or not.
  * Store the credentials: true
  */
  setStoreCred(b: boolean) {
    this.storeCredentials = b;
  }

  /* getStoreCred(): boolean
  * This method returns if the credentials will be
  * stored or not as boolean.
  */
  getStoreCred(): boolean {
    return this.storeCredentials;
  }

  /* setGroup(selectedGroup: string)
  * This method saves the group into the local storage.
  * Format of saved user is the name as string.
  * Parameters are:
  * - selectedGroup: Name of group as string
  *
  */
  setGroup(selectedGroup: string) {
    this.storage.set('group', selectedGroup);
  }

  /* getGroup()
  * This method returns the stored group string from
  * the secure storage of the device as a promise.
  *
  * Format of returned value in promise is string.
  */
  getGroup(){
    return this.storage.get('group').then((group) => {
      this.group = group;
      return this.group;
    });
  }
  }
