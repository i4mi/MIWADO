import { Settings } from './settings';

export class LANGUAGE {

  private static lang:LANGUAGE;

  // Language variables for the type view
  public type_View_Title: string;
  public type_View_Pat: string;
  public type_View_Hp: string;

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
    if(this.lang = null) {
      this.lang = new LANGUAGE();
    }
    return this.lang;
  }

  private langDE(){
    this.type_View_Title = 'Willkommen';
    this.type_View_Pat = 'Ich bin Patient';
    this.type_View_Hp = 'Ich bin Mitarbeiter';

  }

  private langFR(){
    this.type_View_Title = 'none';
    this.type_View_Pat = 'none';
    this.type_View_Hp = 'none';

  }

  private langEN(){
    this.type_View_Title = 'Welcome';
    this.type_View_Pat = 'Patient';
    this.type_View_Hp = 'Health Professional';

  }

}
