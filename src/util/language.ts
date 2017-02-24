import { Settings } from './settings';

export class LANGUAGE {

  private static lang:LANGUAGE;

  // Language variables for the role view
  public role_View_Title: string;
  public role_View_Pat: string;
  public role_View_Hp: string;

  private constructor() {
    var s = Settings.getInstance();
    if (s.getLanguage() == 'de') {
      this.langDE();
    } else if (s.getLanguage() == 'fr') {
      this.langFR();
    } else {
      this.langEN();
    }
  }

  public static getInstance() {
    if(this.lang == null) {
      this.lang = new LANGUAGE();
    }
    return this.lang;
  }

  private langDE(){
    this.role_View_Title = 'Willkommen';
    this.role_View_Pat = 'Ich bin Patient';
    this.role_View_Hp = 'Ich bin Mitarbeiter';

  }

  private langFR(){
    this.role_View_Title = 'none';
    this.role_View_Pat = 'none';
    this.role_View_Hp = 'none';

  }

  private langEN(){
    this.role_View_Title = 'Welcome';
    this.role_View_Pat = 'Patient';
    this.role_View_Hp = 'Health Professional';

  }

}
