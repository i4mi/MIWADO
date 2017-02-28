import { SettingPage } from '../pages/setting/setting';

export class Settings {

  private static s:Settings;
  private lang: string;

  private constructor(){};

  public static getInstance() {
    if (this.s == null){
      this.s = new Settings();
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
