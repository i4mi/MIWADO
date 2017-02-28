import { Settings } from './settings';

export class LANGUAGE {

  private static lang:LANGUAGE;

  // Language variables for the role view
  public role_View_Title: string;
  public role_View_Pat: string;
  public role_View_Hp: string;

  //Language variables for the login view
  public login_View_Title: string;
  public login_View_Username: string;
  public login_View_Password: string;
  public login_View_Button_Role: string;

  //Language variables for the
  public patlist_View_title: string;

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

    this.login_View_Title = 'Login';
    this.login_View_Username = 'Benutzername';
    this.login_View_Password = 'Passwort';
    this.login_View_Button_Role = 'Rolle auswählen';

    this.patlist_View_title = 'Meine Patienten';
  }

  private langFR(){
    this.role_View_Title = 'Bienvenue';
    this.role_View_Pat = 'Je suis un patient';
    this.role_View_Hp = 'Je suis un professionnel de la Santé';

    this.login_View_Title = 'Login';
    this.login_View_Username = "nom d'utilisateur";
    this.login_View_Password = 'mots de passe';
    this.login_View_Button_Role = 'Choisir rôle';

    this.patlist_View_title = 'none';
  }

  private langEN(){
    this.role_View_Title = 'Welcome';
    this.role_View_Pat = "I'm a Patient";
    this.role_View_Hp = "I'm a Health Professional";

    this.login_View_Title = 'Login';
    this.login_View_Username = 'Username';
    this.login_View_Password = 'Password';
    this.login_View_Button_Role = 'Choose role';

    this.patlist_View_title = 'My patients';
  }
}
