import { Settings } from './settings';
import { Platform } from 'ionic-angular';


export class LANGUAGE {

  private static lang:LANGUAGE;
  private platform: Platform;

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
  public settings_IOS_NotChange : string;

  //Language variables for the commThread
  public commThread_TextBlock_Title_NewAppointment : string;
  public commThread_TextBlock_Title_Confirmation : string;
  public commThread_TextBlock_Title_Change_BackOffice : string;
  public commThread_TextBlock_Title_Cancellation_Pat_Calling : string;
  public commThread_TextBlock_Title_Cancellation_Pat_New_Date : string;
  public commThread_TextBlock_Title_Reminder : string;
  public commThread_Button_Choose_MessageType : string;
  public commThread_TextBlock_Alert_Title : string;



  //Language variables for the PatList
  public patlist_View_title: string;

  private constructor(p: Platform) {
    this.platform = p;
    this.changeLanguage();
  }


  public static getInstance(p: Platform) {
    if(this.lang == null) {
      this.lang = new LANGUAGE(p);
    }
    return this.lang;
  }

  changeLanguage() {
    var s = Settings.getInstance(this.platform);
    if (s.getLanguage() == 'de') {
      this.langDE();
    } else if (s.getLanguage() == 'fr') {
      this.langFR();
    } else {
      this.langEN();
    }
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
    this.settings_IOS_NotChange = 'Bitte stellen Sie die Systemsprache um, damit bie IOS Geräten die in-App Sprache angepasst wird.';

    this.patlist_View_title = 'Meine Patienten';

    this.commThread_TextBlock_Title_NewAppointment = 'Neuer Termin';
    this.commThread_TextBlock_Title_Confirmation = 'Bestätigung';
    this.commThread_TextBlock_Title_Change_BackOffice = 'Termin verschieben';
    this.commThread_TextBlock_Title_Cancellation_Pat_Calling = 'Absage, neuer Termin telefonisch';
    this.commThread_TextBlock_Title_Cancellation_Pat_New_Date = 'Absage, neues Datum senden';
    this.commThread_TextBlock_Title_Reminder = 'Erinnerung';
    this.commThread_Button_Choose_MessageType = 'Nachricht auswählen';
    this.commThread_TextBlock_Alert_Title = 'Nachrichtentyp';
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

    this.settings_View_Title = 'Réglage';
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
    this.settings_IOS_NotChange = 'NONE';

    this.patlist_View_title = 'Mes patients ';

    this.commThread_TextBlock_Title_NewAppointment = 'none';
    this.commThread_TextBlock_Title_Confirmation = 'none';
    this.commThread_TextBlock_Title_Change_BackOffice = 'none';
    this.commThread_TextBlock_Title_Cancellation_Pat_Calling = 'none';
    this.commThread_TextBlock_Title_Cancellation_Pat_New_Date = 'none';
    this.commThread_TextBlock_Title_Reminder = 'none';
    this.commThread_Button_Choose_MessageType = 'Choisir Messagostypos';
    this.commThread_TextBlock_Alert_Title = 'Messagostypos';
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
    this.settings_IOS_NotChange = 'NONE';

    this.patlist_View_title = 'My patients';

    this.commThread_TextBlock_Title_NewAppointment = 'New appointment';
    this.commThread_TextBlock_Title_Confirmation = 'Confirmation';
    this.commThread_TextBlock_Title_Change_BackOffice = 'Change appointment';
    this.commThread_TextBlock_Title_Cancellation_Pat_Calling = 'Cancel, call for new Appointment';
    this.commThread_TextBlock_Title_Cancellation_Pat_New_Date = 'Cancel, give new Date ';
    this.commThread_TextBlock_Title_Reminder = 'Reminder';
    this.commThread_Button_Choose_MessageType = 'Please choose message';
    this.commThread_TextBlock_Alert_Title = 'Messagetype';
  }
}
