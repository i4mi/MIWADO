import { Settings } from './settings';

export class LANGUAGE {

  private static lang:LANGUAGE;

  // Language variables for the role view
  public role_View_Title: string;
  public role_View_Pat: string;
  public role_View_Hp: string;

  //Language variables for the role view
  public login_View_Title: string;
  public login_View_Username: string;
  public login_View_Password: string;
  public login_View_Button_Role: string;
  public login_View_PopUp_Title : string;
  public login_View_PopUp_Text : string;
  public login_View_Login_Button : string;

  //Language variables for the settings view
  public settings_View_Title: string;
  public settings_View_Button_Back: string;
  public settings_Radio_French : string;
  public settings_Radio_English : string;
  public settings_Radio_German : string;
  public setting_Language : string;
  public setting_Logout : string;
  public setting_Logout_Button : string;
  public settings_PopUp_Title : string;
  public settings_PopUp_Text : string;
  public settings_PopUp_Cancel : string;
  public settings_PopUp_Confirm : string;


  //Language variables for the PatList
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
    this.login_View_PopUp_Title = 'Login fehlgeschlagen';
    this.login_View_PopUp_Text = 'Benutzername oder Passwort ist ungültig';
    this.login_View_Login_Button = 'Login';

    this.settings_View_Title = 'Einstellungen';
    this.settings_View_Button_Back = 'Zurück';
    this.settings_Radio_French = 'Französisch';
    this.settings_Radio_German = 'Deutsch';
    this.settings_Radio_English = 'Englisch';
    this.setting_Language = 'Sprache';
    this.setting_Logout = 'Logout';
    this.setting_Logout_Button = 'Logout';
    this.settings_PopUp_Title = 'Logout';
    this.settings_PopUp_Text = 'Möchten Sie sich wirklich abmelden?';
    this.settings_PopUp_Cancel = 'Abbrechen';
    this.settings_PopUp_Confirm = 'Bestätigen';

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
    this.login_View_PopUp_Title = 'Login échoué';
    this.login_View_PopUp_Text = "Nom d'utilisateur ou mot de passe incorrect";
    this.login_View_Login_Button = 'Login';

    this.settings_View_Title = 'none';
    this.settings_View_Button_Back = 'Dos';
    this.settings_Radio_French = 'Français';
    this.settings_Radio_German = 'Allemand';
    this.settings_Radio_English = 'Anglais';
    this.setting_Language = 'Langue';
    this.setting_Logout = 'Logout';
    this.setting_Logout_Button = 'Logout';
    this.settings_PopUp_Title = 'Logout';
    this.settings_PopUp_Text = 'Voulez-vous vraiment vous déconnecter?';
    this.settings_PopUp_Cancel = 'Annuler';
    this.settings_PopUp_Confirm = 'Confirmer';

    this.patlist_View_title = 'Mes patients ';
  }

  private langEN(){
    this.role_View_Title = 'Welcome';
    this.role_View_Pat = "I'm a Patient";
    this.role_View_Hp = "I'm a Health Professional";

    this.login_View_Title = 'Login';
    this.login_View_Username = 'Username';
    this.login_View_Password = 'Password';
    this.login_View_Button_Role = 'Choose role';
    this.login_View_PopUp_Title = 'Login failed';
    this.login_View_PopUp_Text = 'Invalid username or password';
    this.login_View_Login_Button = 'Login';

    this.settings_View_Title = 'Settings';
    this.settings_View_Button_Back = 'Back';
    this.settings_Radio_French = 'French';
    this.settings_Radio_German = 'German';
    this.settings_Radio_English = 'English';
    this.setting_Language = 'Language';
    this.setting_Logout = 'Logout';
    this.setting_Logout_Button = 'Logout';
    this.settings_PopUp_Title = 'Logout';
    this.settings_PopUp_Text = 'Do you really want to log out?';
    this.settings_PopUp_Cancel = 'Cancel';
    this.settings_PopUp_Confirm = 'Confirm';

    this.patlist_View_title = 'My patients';
  }
}
