import { SettingPage } from '../pages/setting/setting';
import { Platform } from 'ionic-angular';

export class Settings {

  private static s:Settings;
  private lang: string;
  private platform: Platform;

  private constructor(p: Platform){
      this.platform = p;
      if(p.is('ios') && p.is('mobile')) {
        this.setLanguage(window.navigator.language)
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
}
