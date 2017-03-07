import { Settings } from './settings';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';


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
  public settings_ChkBox_StoreCred : string;
  public setting_DeleteCredetials : string;
  public setting_Credentials : string;

  //Language variables for the commThread
  public commThread_TextBlock_Title_NewAppointment : string;
  public commThread_TextBlock_Title_Confirmation : string;
  public commThread_TextBlock_Title_Cancellation : string;
  public commThread_TextBlock_Title_Change_BackOffice : string;
  public commThread_TextBlock_Title_Cancellation_Pat_Calling : string;
  public commThread_TextBlock_Title_Cancellation_Pat_New_Date : string;
  public commThread_TextBlock_Title_Reminder : string;
  public commThread_Button_Choose_MessageType : string;
  public commThread_TextBlock_Alert_Title : string;
  public commThread_my_chat : string;
  public commTread_No_Message_Choosen : string;
  public commTread_No_Message_Choosen_Title : string;

  //Language variables for the TextBlocks

  //Used for all
  public TextBlock_Patient_Welcome : string;
  public TextBlock_Welcome : string;
  public TextBlock_at : string;
  public TextBlock_Sincere_regards: string;
  public TextBlock_cancelation: string;
  public TextBlock_cancelation_Costs: string;
  public TextBlock_Phonenumber: string;
  public TextBlock_Place: string;
  public TextBlock_on : string;


  //Reminder
  public TextBlock_Reminder_1 : string;
  public TextBlock_Reminder_2 : string;
  public TextBlock_Reminder_3 : string;
  public TextBlock_Reminder_4 : string;
  public TextBlock_Reminder_5 : string;

  //new Appointment
  public TextBlock_newAppointment_1 : string;
  public TextBlock_newAppointment_2 : string;
  public TextBlock_newAppointment_3 : string;
  public TextBlock_newAppointment_4 : string;

  //Patient cancelation, will Call
  public TextBlock_PatientWillCall_1 : string;
  public TextBlock_PatientWillCall_2 : string;

  //Patient cancelation, new Date
  public TextBlock_PatientAfterDate_1 : string;
  public TextBlock_PatientAfterDate_2 : string;
  public TextBlock_PatientAfterDate_3 : string;

  //Change Backoffice
  public TextBlock_Change_Backoffice_1 : string;
  public TextBlock_Change_Backoffice_2 : string;
  public TextBlock_Change_Backoffice_3 : string;
  public TextBlock_Change_Backoffice_4 : string;
  public TextBlock_Change_Backoffice_5 : string;

  //Patient will not come
  public TextBlock_PatientwillnotCome_1 : string;
  public TextBlock_PatientwillnotCome_2 : string;

  //Accept Appointment
  public TextBlock_AcceptAppointment_1 : string;


  //Dropdowm Items
  public TextBlock_Man : string;
  public TextBlock_Woman : string;
  public TextBlock_Diabetology : string;
  public TextBlock_endocrinology : string;
  public TextBlock_nutritional_medicine : string;
  public TextBlock_metabolism : string;


  //Language variables for the PatList
  public patlist_View_title: string;

  private constructor(p: Platform, private storage: Storage) {
    this.platform = p;
    this.changeLanguage();
  }


  public static getInstance(p: Platform, s: Storage) {
    if(this.lang == null) {
      this.lang = new LANGUAGE(p, s);
    }
    return this.lang;
  }

  changeLanguage() {
    var s = Settings.getInstance(this.platform, this.storage);
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
    this.settings_ChkBox_StoreCred = 'Zugangsdaten speichern';
    this.setting_DeleteCredetials = 'Zugangsdaten löschen';
    this.setting_Credentials = 'Zugangsdaten';

    this.patlist_View_title = 'Meine Patienten';

    this.commThread_TextBlock_Title_NewAppointment = 'Neuer Termin';
    this.commThread_TextBlock_Title_Confirmation = 'Bestätigung';
    this.commThread_TextBlock_Title_Change_BackOffice = 'Termin verschieben';
    this.commThread_TextBlock_Title_Cancellation_Pat_Calling = 'Absage, neuer Termin telefonisch';
    this.commThread_TextBlock_Title_Cancellation_Pat_New_Date = 'Absage, neues Datum senden';
    this.commThread_TextBlock_Title_Reminder = 'Erinnerung';
    this.commThread_Button_Choose_MessageType = 'Nachricht auswählen';
    this.commThread_TextBlock_Alert_Title = 'Nachrichtentyp';
    this.commThread_TextBlock_Title_Cancellation = 'Absage';
    this.commThread_my_chat = 'Meine Nachrichten';
    this.commTread_No_Message_Choosen = 'Bitte wähle eine Nachricht aus.';
    this.commTread_No_Message_Choosen_Title = 'Keine Nachricht ausgewählt';

    this.TextBlock_Welcome = 'Guten Tag';
    this.TextBlock_Patient_Welcome = 'Guten Tag, liebes UDEM';
    this.TextBlock_at = 'um';
    this.TextBlock_Sincere_regards = 'Mit freundlichen Grüssen';
    this.TextBlock_cancelation = 'Die Absage des Termins kann bis 24 Stunden vor dem Termin erfolgen.';
    this.TextBlock_cancelation_Costs = 'Absagen, welche später erfolgen, müssen wir Ihnen leider verrechnen.';
    this.TextBlock_Phonenumber = 'Sie erreichen uns unter 031 632 40 70.';
    this.TextBlock_Place = 'Kinderklinik, Eingang 31, Stockwerk G';
    this.TextBlock_on = 'am';
    this.TextBlock_Reminder_1 = 'Ihr nächster Termin ist am';
    this.TextBlock_Reminder_2 = 'Bitte seien Sie um';
    this.TextBlock_Reminder_3 = 'in der';
    this.TextBlock_Reminder_4 = 'Bitte erscheinen Sie nüchtern, das heisst ohne Frühstück.';
    this.TextBlock_Reminder_5 = 'Jedoch sollten die Morgenmedikamente eingenommen werden ausser, wenn vom Arzt anders angeordnet.';
    this.TextBlock_newAppointment_1 = 'Sie haben am';
    this.TextBlock_newAppointment_2 = 'einen Termin in der Abteilung';
    this.TextBlock_newAppointment_3 = 'Wir befinden uns in der';
    this.TextBlock_newAppointment_4 = 'Bitte nehmen Sie ihre Medikamentenliste und Versichertenkarte mit.';
    this.TextBlock_PatientWillCall_1 = 'Dieser Termin geht für mich leider nicht.';
    this.TextBlock_PatientWillCall_2 = 'Ich melde mich bei Ihnen für einen neuen Termin.';
    this.TextBlock_PatientAfterDate_1 = 'Dieser Termin geht für mich leider nicht.';
    this.TextBlock_PatientAfterDate_2 = 'Bitte senden Sie mir einen neuen Termin nach';
    this.TextBlock_PatientAfterDate_3 = 'dem';
    this.TextBlock_Change_Backoffice_1 = 'Wir müssen Sie leider Informieren, dass der Termin';
    this.TextBlock_Change_Backoffice_2 = 'vom';
    this.TextBlock_Change_Backoffice_3 = 'verschoben werden';
    this.TextBlock_Change_Backoffice_4 = 'muss. Ein möglicher anderer Termin wäre der';
    this.TextBlock_Change_Backoffice_5 = 'Bitte bestätigen Sie diesen Termin.';
    this.TextBlock_PatientwillnotCome_1 = 'Ich muss mich leider für den Termin';
    this.TextBlock_PatientwillnotCome_2 = 'abmelden.';
    this.TextBlock_AcceptAppointment_1 = 'Vielen Dank, gerne bestätige den Termin';
    this.TextBlock_Man = 'Herr';
    this.TextBlock_Woman = 'Frau';
    this.TextBlock_Diabetology = 'Diabetologie';
    this.TextBlock_endocrinology = 'Endokrinologie';
    this.TextBlock_nutritional_medicine = 'Ernährungsmedizin';
    this.TextBlock_metabolism = 'Metabolismus';
  }


  private langFR(){
    this.role_View_Title = 'Bienvenue';
    this.TextBlock_Patient_Welcome = 'Bienvenue, UDEM';
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
    this.settings_ChkBox_StoreCred = 'NONE';
    this.setting_DeleteCredetials = 'NONE';
    this.setting_Credentials = 'NONE';

    this.patlist_View_title = 'Mes patients ';

    this.commThread_TextBlock_Title_NewAppointment = 'none';
    this.commThread_TextBlock_Title_Confirmation = 'none';
    this.commThread_TextBlock_Title_Change_BackOffice = 'none';
    this.commThread_TextBlock_Title_Cancellation_Pat_Calling = 'none';
    this.commThread_TextBlock_Title_Cancellation_Pat_New_Date = 'none';
    this.commThread_TextBlock_Title_Reminder = 'none';
    this.commThread_Button_Choose_MessageType = 'Choisir Messagostypos';
    this.commThread_TextBlock_Alert_Title = 'Messagostypos';
    this.commThread_TextBlock_Title_Cancellation = 'Annulation';
    this.commThread_my_chat = 'none';
    this.commTread_No_Message_Choosen = 'none';
    this.commTread_No_Message_Choosen_Title = 'none';

    this.TextBlock_Welcome = 'none';
    this.TextBlock_at = 'none';
    this.TextBlock_Sincere_regards = 'none';
    this.TextBlock_cancelation = 'none';
    this.TextBlock_cancelation_Costs = 'none';
    this.TextBlock_Phonenumber = 'none';
    this.TextBlock_Place = 'none';
    this.TextBlock_on = 'none';
    this.TextBlock_Reminder_1 = 'none';
    this.TextBlock_Reminder_2 = 'none';
    this.TextBlock_Reminder_3 = 'none';
    this.TextBlock_Reminder_4 = 'none';
    this.TextBlock_Reminder_5 = 'none';
    this.TextBlock_newAppointment_1 = 'none';
    this.TextBlock_newAppointment_2 = 'none';
    this.TextBlock_newAppointment_3 = 'none';
    this.TextBlock_newAppointment_4 = 'none';
    this.TextBlock_PatientWillCall_1 = 'none';
    this.TextBlock_PatientWillCall_2 = 'none';
    this.TextBlock_PatientAfterDate_1 = 'none';
    this.TextBlock_PatientAfterDate_2 = 'none';
    this.TextBlock_PatientAfterDate_3 = 'none';
    this.TextBlock_Change_Backoffice_1 = 'none';
    this.TextBlock_Change_Backoffice_2 = 'none';
    this.TextBlock_Change_Backoffice_3 = 'none';
    this.TextBlock_Change_Backoffice_5 = 'none';
    this.TextBlock_Change_Backoffice_4 = 'none';
    this.TextBlock_PatientwillnotCome_1 = 'none';
    this.TextBlock_PatientwillnotCome_2 = 'none';
    this.TextBlock_AcceptAppointment_1 = 'none';
    this.TextBlock_Man = 'none';
    this.TextBlock_Woman = 'none';
    this.TextBlock_Diabetology = 'none';
    this.TextBlock_endocrinology = 'none';
    this.TextBlock_nutritional_medicine = 'none';
    this.TextBlock_metabolism = 'none';
  }

  private langEN(){
    this.role_View_Title = 'Welcome';
    this.TextBlock_Patient_Welcome = 'Welcome, UDEM';
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
    this.settings_ChkBox_StoreCred = 'Store credentials';
    this.setting_DeleteCredetials = 'Delete credentials';
    this.setting_Credentials = 'Credentials';

    this.patlist_View_title = 'My patients';

    this.commThread_TextBlock_Title_NewAppointment = 'New appointment';
    this.commThread_TextBlock_Title_Confirmation = 'Confirmation';
    this.commThread_TextBlock_Title_Change_BackOffice = 'Change appointment';
    this.commThread_TextBlock_Title_Cancellation_Pat_Calling = 'Cancel, call for new Appointment';
    this.commThread_TextBlock_Title_Cancellation_Pat_New_Date = 'Cancel, give new Date ';
    this.commThread_TextBlock_Title_Reminder = 'Reminder';
    this.commThread_Button_Choose_MessageType = 'Please choose message';
    this.commThread_TextBlock_Alert_Title = 'Messagetype';
    this.commThread_TextBlock_Title_Cancellation = 'Cancellation';
    this.commThread_my_chat = 'My Messages';
    this.commTread_No_Message_Choosen = 'Please choose a message.';
    this.commTread_No_Message_Choosen_Title = 'No message choosen';

    this.TextBlock_Welcome = 'Welcome';
    this.TextBlock_at = 'at';
    this.TextBlock_Sincere_regards = 'Sincere regards';
    this.TextBlock_cancelation = 'none';
    this.TextBlock_cancelation_Costs = 'none';
    this.TextBlock_Phonenumber = 'none';
    this.TextBlock_Place = 'none';
    this.TextBlock_on = 'none';
    this.TextBlock_Reminder_1 = 'none';
    this.TextBlock_Reminder_2 = 'none';
    this.TextBlock_Reminder_3 = 'none';
    this.TextBlock_Reminder_4 = 'none';
    this.TextBlock_Reminder_5 = 'none';
    this.TextBlock_newAppointment_1 = 'none';
    this.TextBlock_newAppointment_2 = 'none';
    this.TextBlock_newAppointment_3 = 'none';
    this.TextBlock_newAppointment_4 = 'none';
    this.TextBlock_PatientWillCall_1 = 'none';
    this.TextBlock_PatientWillCall_2 = 'none';
    this.TextBlock_PatientAfterDate_1 = 'none';
    this.TextBlock_PatientAfterDate_2 = 'none';
    this.TextBlock_PatientAfterDate_3 = 'none';
    this.TextBlock_Change_Backoffice_1 = 'none';
    this.TextBlock_Change_Backoffice_2 = 'none';
    this.TextBlock_Change_Backoffice_3 = 'none';
    this.TextBlock_Change_Backoffice_5 = 'none';
    this.TextBlock_Change_Backoffice_4 = 'none';
    this.TextBlock_PatientwillnotCome_1 = 'none';
    this.TextBlock_PatientwillnotCome_2 = 'none';
    this.TextBlock_AcceptAppointment_1 = 'none';
    this.TextBlock_Man = 'none';
    this.TextBlock_Woman = 'none';
    this.TextBlock_Diabetology = 'none';
    this.TextBlock_endocrinology = 'none';
    this.TextBlock_nutritional_medicine = 'none';
    this.TextBlock_metabolism = 'none';
  }
}
