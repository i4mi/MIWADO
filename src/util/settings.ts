import { SettingPage } from '../pages/setting/setting';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import * as MiwadoTypes from './typings/MIWADO_Types';

export class Settings {

  private static s:Settings;
  private lang: string;
  private storeCredentials = false;
  private user: MiwadoTypes.MIWADO_User;

  private constructor(private platform: Platform, private storage: Storage){
      if(platform.is('ios') && platform.is('mobile')) {
        this.setLanguage(window.navigator.language)
      }

      this.user = {
        username: '',
        password: '',
      }
  }

  public static getInstance(p: Platform, s: Storage) {
    if (this.s == null){
      this.s = new Settings(p, s);
    }
    return this.s;
  }

  setLanguage(l: string) {
    if (l == 'de') {
      this.lang = 'de';
    } else if (l == 'fr') {
      this.lang = 'fr';
    } else {
      this.lang = 'en';
    }
  }

  getLanguage(): string {
    return this.lang;
  }

  setUser(un: string, pw: string) {
    this.user.username = un;
    this.user.password = pw;

    this.storage.set('user', JSON.stringify(this.user));
  }

  getUser() {
    return this.storage.get('user').then((user) => {
      this.user = JSON.parse(user);
      return this.user;
    });
  }

  setStoreCred(b: boolean) {
    this.storeCredentials = b;
  }

  getStoreCred(): boolean {
    return this.storeCredentials;
  }
}
