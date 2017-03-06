import { SettingPage } from '../pages/setting/setting';
import { Platform } from 'ionic-angular';
import * as MiwadoTypes from './typings/MIWADO_Types';

export class Settings {

  private static s:Settings;
  private lang: string;
  private platform: Platform;
  private storeCredentials = false;
  private user: MiwadoTypes.MIWADO_User;

  private constructor(p: Platform){
      this.platform = p;
      if(p.is('ios') && p.is('mobile')) {
        this.setLanguage(window.navigator.language)
      }

      this.user = {
        username: '',
        password: '',
      }
  }

  public static getInstance(p: Platform) {
    if (this.s == null){
      this.s = new Settings(p);
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
  }

  getUser() {
    return this.user;
  }

  setStoreCred(b: boolean) {
    this.storeCredentials = b;
  }

  getStoreCred(): boolean {
    return this.storeCredentials;
  }
}
