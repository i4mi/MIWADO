import { Settings } from './settings';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
* Class LANGUAGE
* This class contains all string variables
* to be displayed in different lanugages.
*
* The language can be one of the following:
* - DE for German (default)
* - FR for France
* - EN for English
*
* Version:    1.0 Test Version
* Author(s):  isels1, zyssm4
* Date:       Builded 15.06.2017
*/

export class LANGUAGE {

  private static lang:LANGUAGE;
  private platform: Platform;

  // Language variables for the role view
  public role_View_Title: string;
  public role_View_Pat: string;
  public role_View_Hp: string
  public role_View_Parter : string;

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
  public settings_deleteCredentials_PopUp_Title : string;
  public settings_deleteCredentials_PopUp_Text : string;
  public settings_IOS_NotChange : string;
  public settings_ChkBox_StoreCred : string;
  public setting_DeleteCredetials : string;
  public setting_Credentials : string;
  public setting_Choose_Group : string;
  public setting_Selected_Group: string;
  public survey_Title: string;

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
  public commThread_No_Date_Choosen : string;
  public commThread_No_Date_Choosen_Title : string;
  public commThread_No_Time_Choosen : string;
  public commThread_No_Time_Choosen_Title : string;
  public commThread_No_Section_Choosen_Title : string;
  public commThread_No_Section_Choosen : string;
  public commTread_No_Group_Choosen_Title : string;
  public commTread_No_Group_Choosen : string;
  public commThread_exportAppointment_PopUp_Title : string;
  public commThread_exportAppointment_PopUp_Text : string;
  public commThread_exportAppointment_Title : string;
  public commThread_exportAppointment_Location :string;
  public commThread_exportAppointment_Body :string;
  public commThread_Choose_Message_PopUp : string;
  public commThread_Message_Sent_Title : string;
  public commThread_Message_Sent : string;
  public commThread_Message_Received_Title : string;
  public commThread_Send_Message: string;

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
  public TextBlock_UDEM_Team: string;


  //Reminder
  public TextBlock_Reminder_1 : string;
  public TextBlock_Reminder_2 : string;
  public TextBlock_Reminder_3 : string;
  public TextBlock_Reminder_4 : string;
  public TextBlock_Reminder_5 : string;
  public TextBlock_not_fasting :string;
  public TextBlock_fasting :string;
  public commThread_No_FastingStatus_Choosen_Title :string;
  public commThread_No_FastingStatus_Choosen :string;

  //new Appointment
  public TextBlock_newAppointment_1 : string;
  public TextBlock_newAppointment_2 : string;
  public TextBlock_newAppointment_3 : string;
  public TextBlock_newAppointment_4 : string;

  //Patient cancelation, will Call
  public TextBlock_PatientWillCall_1 : string;
  public TextBlock_PatientWillCall_2 : string;
  public TextBlock_PatientWillCall_3 : string;

  //Patient cancelation, new Date
  public TextBlock_PatientAfterDate_1 : string;
  public TextBlock_PatientAfterDate_3 : string;
  public TextBlock_PatientAfterDate_2 : string;
  public TextBlock_time_morning : string;
  public TextBlock_time_afternoon : string;
  public TextBlock_time_none : string;
  public textMessages_DayTime_Title : string;
  public textMessages_patientCancelationNewDate_DayTime_Info : string;

  //Change Backoffice
  public TextBlock_Change_Backoffice_1 : string;
  public TextBlock_Change_Backoffice_2 : string;
  public TextBlock_Change_Backoffice_3 : string;
  public TextBlock_Change_Backoffice_4 : string;

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

  public textMessages_Date_Title :string;
  public textMessages_Time_Title : string;
  public textMessages_Select_Department_Title: string;
  public textMessages_Fastingstatus_Title: string;

  public textMessages_changeBackoffice_Date1_Info : string;
  public textMessages_changeBackoffice_Date2_Info: string;
  public textMessages_changeBackoffice_Time_Info : string;
  public textMessages_newAppointment_Date_Info: string;
  public textMessages_newAppointment_Time_Info: string;
  public textMessages_newAppointment_Department_Info: string;
  public textMessages_reminder_Fastingstatus_Info : string;

  //IMPRESSUM
  public impressum_Title: string;
  public impressum_Contact_Title : string;
  public impressum_Contact_AppName : string;
  public impressum_Contact_BFH: string;
  public impressum_Contact_Adress: string;
  public impressum_Contact_City: string;
  public impressum_Contact_Email_Title: string;

  public impressum_HA_Title: string;
  public impressum_HA_Text_1: string;
  public impressum_HA_Text_2: string;
  public impressum_HA_Text_3: string;

  public impressum_Rights_Title: string;
  public impressum_Rights_Text: string;

  public impressum_Data_Title: string;
  public impressum_Data_Text_1: string;
  public impressum_Data_Text_2: string;

  //DateTime OK/Cancel
  public dateTimePicker_Ok: string;
  public dateTimePicker_Cancel: string;
  //NavBar Items
  private util_backButton : string;

  //Language variables for the PatList
  public patlist_View_title: string;

  //Guide Test form the SideMenu
  public guide_Title : string;
  public guide_Role_Title : string;
  public guide_Role_Text : string;
  public guide_Login_Title : string;
  public guide_Login_Text : string;
  public guide_export_Title : string;
  public guide_export_Text : string;
  public guide_Settings_Title : string;
  public guide_Settings_Text1 : string;
  public guide_Settings_Text2 : string;


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
    } else if (s.getLanguage() == 'en') {
      this.langEN();
    } else {
      this.langDE();
    }
  }

  private langDE(){
    this.role_View_Title = 'Willkommen';
    this.role_View_Pat = 'Ich bin Patient';
    this.role_View_Hp = 'Ich bin Mitarbeiter';
    this.role_View_Parter = 'Partner:';

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
    this.settings_deleteCredentials_PopUp_Title = 'Zugangsdaten löschen';
    this.settings_deleteCredentials_PopUp_Text = 'Möchten Sie ihre Zugangsdaten löschen und sich abmelden?';
    this.settings_PopUp_Cancel = 'Abbrechen';
    this.settings_PopUp_Confirm = 'Bestätigen';
    this.settings_IOS_NotChange = 'Um die Sprache zu ändern, müssen Sie die Systemsprache des Gerätes angepasst.';
    this.settings_ChkBox_StoreCred = 'Zugangsdaten speichern';
    this.setting_DeleteCredetials = 'Zugangsdaten löschen';
    this.setting_Credentials = 'Zugangsdaten';
    this.setting_Choose_Group = 'Gruppe auswählen';

    this.patlist_View_title = 'Meine Patienten';

    this.commThread_TextBlock_Title_NewAppointment = 'Neuer Termin';
    this.commThread_TextBlock_Title_Confirmation = 'Bestätigung';
    this.commThread_TextBlock_Title_Change_BackOffice = 'Termin verschieben';
    this.commThread_TextBlock_Title_Cancellation_Pat_Calling = 'Absage, neuer Termin telefonisch';
    this.commThread_TextBlock_Title_Cancellation_Pat_New_Date = 'Absage, neues Datum anfragen';
    this.commThread_TextBlock_Title_Reminder = 'Erinnerung';
    this.commThread_Button_Choose_MessageType = 'Nachricht auswählen';
    this.commThread_TextBlock_Alert_Title = 'Nachrichtentyp';
    this.commThread_TextBlock_Title_Cancellation = 'Absage';
    this.commThread_my_chat = 'Meine Nachrichten';
    this.commTread_No_Message_Choosen = 'Bitte wähle eine Nachricht aus.';
    this.commTread_No_Message_Choosen_Title = 'Keine Nachricht ausgewählt';
    this.commThread_No_Date_Choosen = 'Bitte selektiere ein Datum';
    this.commThread_No_Date_Choosen_Title = 'Kein Datum angegeben';
    this.commThread_No_Time_Choosen = 'Bitte selektiere die Zeit.';
    this.commThread_No_Time_Choosen_Title = 'Keine Zeit angegeben';
    this.commThread_No_Section_Choosen_Title = 'Keine Abteilung ausgewählt';
    this.commThread_No_Section_Choosen = 'Bitte wähle eine Abteilung aus.';
    this.commTread_No_Group_Choosen_Title = 'Keine Gruppe ausgewählt';
    this.commTread_No_Group_Choosen = 'Bitte wähle eine verfügbare Gruppe in den Einstellungen aus.';
    this.commThread_exportAppointment_PopUp_Title = "Termin exportieren";
    this.commThread_exportAppointment_PopUp_Text = "Wollen Sie diesen Termin in Ihren Kalender exportieren?";
    this.commThread_exportAppointment_Title = "MIWADO Termin";
    this.commThread_exportAppointment_Location = "UDEM";
    this.commThread_exportAppointment_Body = "Termin";
    this.commThread_No_FastingStatus_Choosen_Title ="Bitte Auswahl treffen";
    this.commThread_No_FastingStatus_Choosen = "Bitte wählen Sie ob der Patient nüchtern erscheinen soll oder nicht";
    this.commThread_Choose_Message_PopUp = 'Nachricht auswählen';
    this.commThread_Message_Sent_Title = 'Gesendet';
    this.commThread_Message_Sent = 'Ihre Nachricht wurde gesendet.';
    this.commThread_Message_Received_Title = 'Neue Nachricht erhalten.';
    this.commThread_Send_Message = "Nachricht senden"

    this.TextBlock_Welcome = 'Guten Tag ';
    this.TextBlock_Patient_Welcome = 'Guten Tag, liebe UDEM';
    this.TextBlock_at = 'um ';
    this.TextBlock_Sincere_regards = 'Freundliche Grüsse ';
    this.TextBlock_cancelation = 'Die Absage des Termins kann bis 24 Stunden vor dem Termin erfolgen.';
    this.TextBlock_cancelation_Costs = 'Absagen, welche später erfolgen, müssen wir Ihnen leider verrechnen.';
    this.TextBlock_Phonenumber = 'Sie erreichen uns unter 031 632 40 70.';
    this.TextBlock_Place = 'Kinderklinik, Eingang 31, Stockwerk G.';
    this.TextBlock_on = 'am ';
    this.TextBlock_Reminder_1 = 'Ihr nächster Termin ist am ';
    this.TextBlock_Reminder_2 = 'Bitte seien Sie um ';
    this.TextBlock_Reminder_3 = 'in der ';
    this.TextBlock_Reminder_4 = 'Bitte erscheinen Sie nüchtern, das heisst ohne Frühstück.';
    this.TextBlock_Reminder_5 = 'Jedoch sollten die Morgenmedikamente eingenommen werden. Ausser, wenn vom Arzt anders angeordnet.';
    this.TextBlock_newAppointment_1 = 'Sie haben am ';
    this.TextBlock_newAppointment_2 = 'einen Termin in der Abteilung ';
    this.TextBlock_newAppointment_3 = 'Wir befinden uns in der ';
    this.TextBlock_newAppointment_4 = 'Bitte nehmen Sie ihre Medikamentenliste und Versichertenkarte mit.';
    this.TextBlock_PatientWillCall_1 = 'Der Termin vom ';
    this.TextBlock_PatientWillCall_3 = 'geht mir leider nicht.';
    this.TextBlock_PatientWillCall_2 = 'Ich melde mich bei Ihnen für einen neuen Termin.';
    this.TextBlock_PatientAfterDate_1 = 'Der Termin vom ';
    this.TextBlock_PatientAfterDate_3 = 'geht mir leider nicht.';
    this.TextBlock_PatientAfterDate_2 = 'Bitte senden Sie mir einen neuen Termin nach dem ';
    this.TextBlock_Change_Backoffice_1 = 'Wir müssen Sie leider informieren, dass der Termin vom ';
    this.TextBlock_Change_Backoffice_2 = 'verschoben werden muss.';
    this.TextBlock_Change_Backoffice_3 = 'Ein möglicher anderer Termin wäre der ';
    this.TextBlock_Change_Backoffice_4 = 'Bitte bestätigen Sie diesen Termin.';
    this.TextBlock_PatientwillnotCome_1 = 'Ich muss mich leider für den Termin am ';
    this.TextBlock_PatientwillnotCome_2 = 'abmelden.';
    this.TextBlock_AcceptAppointment_1 = 'Vielen Dank, gerne bestätige ich den Termin ';
    this.TextBlock_Man = 'Herr';
    this.TextBlock_Woman = 'Frau';
    this.TextBlock_Diabetology = 'Diabetologie';
    this.TextBlock_endocrinology = 'Endokrinologie';
    this.TextBlock_nutritional_medicine = 'Ernährungsmedizin';
    this.TextBlock_metabolism = 'Metabolismus';
    this.TextBlock_not_fasting = "Nicht nüchtern";
    this.TextBlock_fasting = "Nüchtern";
    this.TextBlock_UDEM_Team = "Ihre UDEM";
    this.TextBlock_time_morning = "am Morgen";
    this.TextBlock_time_afternoon = "am Nachmittag";
    this.TextBlock_time_none = "jederzeit";
    this.textMessages_DayTime_Title = "Tageszeit wählen";
    this.textMessages_patientCancelationNewDate_DayTime_Info = "Bitte die Tageszeit auswählen.";

    this.textMessages_Date_Title = "Datum eingeben";
    this.textMessages_Time_Title = "Zeit eingeben";
    this.textMessages_changeBackoffice_Date1_Info = "Bitte das alte Datum angeben.";
    this.textMessages_changeBackoffice_Date2_Info = "Bitte das Datum des neuen Termin angeben.";
    this.textMessages_changeBackoffice_Time_Info = "Bitte die Zeit des neuen Termin angeben.";

    this.textMessages_newAppointment_Date_Info = "Bitte das Datum des Termins angeben.";
    this.textMessages_newAppointment_Time_Info = "Bitte die Zeit des Termins angeben.";
    this.textMessages_Select_Department_Title = "Abteilung auswählen";
    this.textMessages_newAppointment_Department_Info = "Bitte die Abteilung des Termins angeben.";
    this.textMessages_Fastingstatus_Title = "Nüchtern?";
    this.textMessages_reminder_Fastingstatus_Info = "Bitte angeben, ob der Patient nüchtern oder nicht erscheinen muss."


    this.TextBlock_time_morning = "am Morgen";
    this.TextBlock_time_afternoon = "am Nachmittag";
    this.TextBlock_time_none = "jederzeit";

    this.impressum_Title = "Impressum";
    this.impressum_Contact_Title = "Kontakt";
    this.impressum_Contact_AppName = "MIWADO";
    this.impressum_Contact_BFH = "Berner Fachhochschule";
    this.impressum_Contact_Adress = "Quellgasse 21";
    this.impressum_Contact_City = " 2501 Biel";
    this.impressum_Contact_Email_Title = "Email:";
    this.impressum_HA_Title = "Haftungsausschluss";
    this.impressum_HA_Text_1 = "Die Entwickler der MIWADO Applikation übernehmen keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.";
    this.impressum_HA_Text_2 = "Haftungsansprüche gegen die Entwickler wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.";
    this.impressum_HA_Text_3 = "Alle Angebote sind unverbindlich. Die Entwickler behalten es sich ausdrücklich vor, Teile der Applikation oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.";
    this.impressum_Rights_Title = "Urheberrechte";
    this.impressum_Rights_Text = "Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien der Applikation gehören ausschliesslich den Entwicklern der MIWADO Applikation oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.";
    this.impressum_Data_Title = "Datenschutz";
    this.impressum_Data_Text_1 = "Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und die datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf Schutz vor Missbrauch ihrer persönlichen Daten. Wir halten diese Bestimmungen ein. Persönliche Daten werden streng vertraulich behandelt und jegliche Daten werden auf der MIDATA Plattform gespeichert und durch diese geschützt. Eine Weitergabe der Daten erfolgt lediglich wenn der Ersteller der Daten dies so auf der MIDATA Plattform ausdrücklich eingewilligt hat.";
    this.impressum_Data_Text_2 = "Der Schutz vor fremden Zugriffen, Verlusten, Missbrauch oder vor Fälschung wird durch die MIDATA.coop gewährleistet.";

    this.dateTimePicker_Ok = "Auswählen";
    this.dateTimePicker_Cancel = "Abbrechen";

    this.survey_Title = "Umfrage";

    this.util_backButton = "Zurück";

    this.guide_Title = "Anleitung";
    this.guide_Role_Title = "Rolle auswählen";
    this.guide_Role_Text = "Bitte wählen Sie die ihnen zutreffende Rolle aus.";
    this.guide_Login_Title = "Login";
    this.guide_Login_Text = "Um sich in die MIWADO App einloggen zu können, bentöigen sie ein MIDATA Konto. Dieses können Sie unter demo.midata.coop erstellen.";
    this.guide_export_Title = "Termin exportieren";
    this.guide_export_Text = "Um einen Termin zu exportieren, klicken Sie auf die Nachricht mit dem gewünschten Termin. Danach werden Sie aufgefordert diesen zu exportieren. Bestätigen Sie das exportieren, finden Sie den Termin im Geräte eigenen Terminkalender.";
    this.guide_Settings_Title = "Einstellungen";
    this.guide_Settings_Text1 = "In den Einstellungen können Sie die Sprache einstellen. Bei iOS Geräten muss die Sprache direkt in den Geräteeinstellungen geändert werden. Unterstütz sind Deutsch, Französisch und Englisch.";
    this.guide_Settings_Text2 = "Das Logout erfolgt ebenfalls über die Einstellungen. Das Impressum ist auch in den Einstellungen vorzufinden.";

    }


  private langFR(){
    this.role_View_Title = 'Bienvenue';
    this.TextBlock_Patient_Welcome = 'Bienvenue, chère UDEM';
    this.role_View_Pat = 'Je suis un patient';
    this.role_View_Hp = 'Je suis un professionnel de la Santé';
    this.role_View_Parter = 'Partenaire';

    this.login_View_Title = 'Login';
    this.login_View_Username = "nom d'utilisateur";
    this.login_View_Password = 'mots de passe';
    this.login_View_Button_Role = 'Choisir rôle';
    this.login_View_PopUp_Title = 'Login échoué';
    this.login_View_PopUp_Text = "Nom d'utilisateur ou mot de passe incorrect";
    this.login_View_Login_Button = 'Connecter';

    this.settings_View_Title = 'Réglage';
    this.settings_View_Button_Back = 'Retour';
    this.settings_Radio_French = 'Français';
    this.settings_Radio_German = 'Allemand';
    this.settings_Radio_English = 'Anglais';
    this.setting_Language = 'Langue';
    this.setting_Logout = 'Déconnecter';
    this.setting_Logout_Button = 'Déconnecter';
    this.settings_PopUp_Title = 'Déconnecter';
    this.settings_PopUp_Text = 'Voulez-vous réellement vous déconnecter?';
    this.settings_deleteCredentials_PopUp_Title = "Effacer votre données d'entrée";
    this.settings_deleteCredentials_PopUp_Text = "Voulez-vous effacer votre données d'entrée et réellement vous déconnecter?";
    this.settings_PopUp_Cancel = 'Annuler';
    this.settings_PopUp_Confirm = 'Confirmer';
    this.settings_IOS_NotChange = 'Pour changer la langue vous devez changer le language du système.';
    this.settings_ChkBox_StoreCred = 'Stocker les identifiants';
    this.setting_DeleteCredetials = 'Effacer les identifiants';
    this.setting_Credentials = 'Identifiants';
    this.setting_Choose_Group = 'Choisir groupe';
    this.setting_Selected_Group = 'Groupe choisi';

    this.patlist_View_title = 'Mes patients ';

    this.commThread_TextBlock_Title_NewAppointment = 'Nouveau rendez-vous';
    this.commThread_TextBlock_Title_Confirmation = 'Confiramtion';
    this.commThread_TextBlock_Title_Change_BackOffice = 'Repousser le rendez-vous';
    this.commThread_TextBlock_Title_Cancellation_Pat_Calling = 'Annulation, nouveau rendez-vous par téléphone';
    this.commThread_TextBlock_Title_Cancellation_Pat_New_Date = 'Annulation, chercher nouveau date';
    this.commThread_TextBlock_Title_Reminder = 'Rappel';
    this.commThread_Button_Choose_MessageType = 'Choisir message';
    this.commThread_TextBlock_Alert_Title = 'Type de message';
    this.commThread_TextBlock_Title_Cancellation = 'Annulation';
    this.commTread_No_Message_Choosen = 'Veuillez choisir un message.';
    this.commTread_No_Message_Choosen_Title = 'Pas de message sélectionné';
    this.commThread_my_chat = 'Mes messages';
    this.commThread_No_Section_Choosen_Title = 'Pas de département choisi';
    this.commThread_No_Section_Choosen = 'Veuillez choisir un département.';
    this.commTread_No_Group_Choosen_Title = 'Pas de groupe sélectionné';
    this.commTread_No_Group_Choosen = 'Veuillez choisir un des groupes disponibles dans la section paramètres.';
    this.commThread_exportAppointment_PopUp_Title = "Exporter le rendez-vous";
    this.commThread_exportAppointment_PopUp_Text = "Est-ce que vous voudrez exporter ce rendez-vous?";
    this.commThread_exportAppointment_Title = "MIWADO Rendez-vous";
    this.commThread_exportAppointment_Location = "UDEM";
    this.commThread_exportAppointment_Body = "Rendez-vous";
    this.commThread_Choose_Message_PopUp = 'Choisir message';
    this.commThread_No_FastingStatus_Choosen_Title ="Veuillez faire votre choix";
    this.commThread_No_FastingStatus_Choosen = "Veuillez choisir si le patient doit se présenter à jeun ou non.";
    this.commThread_Message_Sent_Title = 'Envoyé';
    this.commThread_Message_Sent = 'Votre message a été envoyé.';
    this.commThread_Message_Received_Title = 'Nouveau message';
    this.commThread_Send_Message = 'Envoyer message';

    this.TextBlock_Welcome = 'Bonjour';
    this.TextBlock_at = 'à';
    this.TextBlock_Sincere_regards = 'Sincères salutations';
    this.TextBlock_cancelation = "L'annulation doit être faite au plus tard 24 heures avant le rendez-vous.";
    this.TextBlock_cancelation_Costs = "Les annulations qui s'effectuent plus tard doivent malhereusement être facturées";
    this.TextBlock_Phonenumber = 'Vous pouvez nous joidre sur 031 632 40 70.';
    this.TextBlock_Place = 'hôpital pour enfants, entrée 31, étage G';
    this.TextBlock_on = 'le';
    this.TextBlock_Reminder_1 = 'Votre prochain rendez-vous est le';
    this.TextBlock_Reminder_2 = 'Veuillez être présent à';
    this.TextBlock_Reminder_3 = "à l'";
    this.TextBlock_Reminder_4 = "Veuillez venir à jeun, c'est à dire que sans avoir déjeuné";
    this.TextBlock_Reminder_5 = "Cependant les médicaments du matin doivent être prises, sauve si votre médecin vous l'a préscrit différemment";
    this.TextBlock_newAppointment_1 = 'Vous avez le ';
    this.TextBlock_newAppointment_2 = 'un rendez-vous dans le département';
    this.TextBlock_newAppointment_3 = "Vous nous trouverez à l'";
    this.TextBlock_newAppointment_4 = "Veuillez prendre votre liste de médication et votre carte d'assurance avec.";
    this.TextBlock_PatientWillCall_1 = 'Je ne serais pas disponible pour le rendez-vous du';
    this.TextBlock_PatientWillCall_3 = '.';
    this.TextBlock_PatientWillCall_2 = 'Je vous contacte pour une nouvelle date.';
    this.TextBlock_PatientAfterDate_1 = 'Je ne serais pas disponible pour le rendez-vous du';
    this.TextBlock_PatientAfterDate_3 = '.';
    this.TextBlock_PatientAfterDate_2 = "Veuillez m'envoyer une nouvelle date après le";
    this.TextBlock_Change_Backoffice_1 = 'Nous devons vous informer, que la date du';
    this.TextBlock_Change_Backoffice_2 = 'doit être répoussée.';
    this.TextBlock_Change_Backoffice_3 = 'Une possible date de remplacement serait le';
    this.TextBlock_Change_Backoffice_4 = 'Veuillez confirmer la date.';
    this.TextBlock_PatientwillnotCome_1 = 'Je dois malhereusement annuler le rendez-vous du';
    this.TextBlock_PatientwillnotCome_2 = '';
    this.TextBlock_AcceptAppointment_1 = 'Merci beaucoup, je confirme volentiers ce rendez-vous';
    this.TextBlock_Man = 'Monsieur';
    this.TextBlock_Woman = 'Madamme';
    this.TextBlock_Diabetology = 'Diabétologie';
    this.TextBlock_endocrinology = 'Endocrinologie';
    this.TextBlock_nutritional_medicine = "Médecine de nutrition";
    this.TextBlock_metabolism = 'Métabolisme';
    this.TextBlock_not_fasting = "pas à jeun";
    this.TextBlock_fasting = "à jeun";
    this.TextBlock_UDEM_Team = "votre UDEM";
    this.TextBlock_time_morning = "le matin";
    this.TextBlock_time_afternoon = "l'après-midi";
    this.TextBlock_time_none = "à tout moment";
    this.textMessages_DayTime_Title = "Choisir heure du jour";
    this.textMessages_patientCancelationNewDate_DayTime_Info = "Veuillez choisir l'heure du jour";


    this.textMessages_Date_Title = "Saisir la date";
    this.textMessages_Time_Title = "Saisir l'heure";
    this.textMessages_changeBackoffice_Date1_Info = "Veuillez saisir la vieille date.";
    this.textMessages_changeBackoffice_Date2_Info = "Veuillez saisir la date du nouveau rendez-vous.";
    this.textMessages_changeBackoffice_Time_Info = "Veuillez saisir l'heure du nouveau rendez-vous.";

    this.textMessages_newAppointment_Date_Info = "Veuillez saisir la date du rendez-vous.";
    this.textMessages_newAppointment_Time_Info = "Veuillez saisir l'heure du rendez-vous.";
    this.textMessages_Select_Department_Title = "Choisir section";
    this.textMessages_newAppointment_Department_Info = "Veuillez selectionnez le département du rendez-vous.";
    this.textMessages_Fastingstatus_Title = "à jeun?";
    this.textMessages_reminder_Fastingstatus_Info = "Veuillez indiquer, si le patient doit se presenter à jeun ou non.";

    this.TextBlock_time_morning = "le matin";
    this.TextBlock_time_afternoon = "l'après-midi";
    this.TextBlock_time_none = "à tout moment";

    this.impressum_Title = "Mentions légales";
    this.impressum_Contact_Title = "Contact:";
    this.impressum_Contact_AppName = "MIWADO";
    this.impressum_Contact_BFH = "Berner Fachhochschule";
    this.impressum_Contact_Adress = "Quellgasse 21";
    this.impressum_Contact_City = " 2501 Biel";
    this.impressum_Contact_Email_Title = "Email:";
    this.impressum_HA_Title = "Clause de non-responsabilité";
    this.impressum_HA_Text_1 = "";
    this.impressum_HA_Text_2 = "Tout contenu téléchargé se fait aux risques et périls de l'utilisateur et sous sa seule responsabilité. En conséquence, ne saurait être tenu responsable d'un quelconque dommage subi par l'ordinateur de l'utilisateur ou d'une quelconque perte de données consécutives au téléchargement.";
    this.impressum_HA_Text_3 = "MIWADO met en œuvre tous les moyens dont elle dispose, pour assurer une information fiable et une mise à jour fiable de ses sites internet. Toutefois, des erreurs ou omissions peuvent survenir. L'internaute devra donc s'assurer de l'exactitude des informations auprès de , et signaler toutes modifications du site qu'il jugerait utile. n'est en aucun cas responsable de l'utilisation faite de ces informations, et de tout préjudice direct ou indirect pouvant en découler.";
    this.impressum_Rights_Title = "Copyright";
    this.impressum_Rights_Text = "Tout le contenu du MIWADO, incluant, de façon non limitative, les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que leur mise en forme sont la propriété exclusive de la société à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.";
    this.impressum_Data_Title = "Protection des données";
    this.impressum_Data_Text_1 = "Sur la base de l'article 13 de la Constitution fédérale et les dispositions relatives à la protection des données de la (Loi sur la protection des données, DSG) fédéral toute personne a droit à la vie privée et à la protection contre une utilisation abusive de leurs données personnelles. Un transfert de données a lieu que lorsque le créateur des données a expressément consenti à la plate-forme MIDATA.";
    this.impressum_Data_Text_2 = "La protection contre l'accès non autorisé, la perte, l'abus ou la falsification est garantie par la MIDATA.coop.";

    this.dateTimePicker_Ok = "Ok";
    this.dateTimePicker_Cancel = "Annuler";

    this.survey_Title = "Sondage";

    this.util_backButton = "Retour";

    this.guide_Title = "Instruction";
    this.guide_Role_Title = "Choisir rôle";
    this.guide_Role_Text = "Veuillez choisir le rôle pertinent.";
    this.guide_Login_Title = "Login";
    this.guide_Login_Text = "Pour pouvoir vous connecter dans l'application MIWADO, vous nécessitez un compte MIDATA.Vous pouvez en faire un sur demo.midata.coop.";
    this.guide_export_Title = "Exporter la date";
    this.guide_export_Text = "Pour exporter une date, appuyez sur le message du rendez-vous désiré. Ensuite vous devez confirmer que vous voulez exporter cette date et finalement vous la trouverez dans le calendrier de votre appareil.";
    this.guide_Settings_Title = "Paramètres";
    this.guide_Settings_Text1 = "Vous pouvez changer de langue dans la section paramètres. Pour utilisateurs d'iPhones il faudra changer la langue directement dans les paramètres de l'appareil. On vous met à disposition les langues Allemand, Français et Anglais.";
    this.guide_Settings_Text2 = "La déconnection se fait dans les paramètres. L'impressum se trouvera à la fin de la section paramètres.";
  }

  private langEN(){
    this.role_View_Title = 'Welcome';
    this.role_View_Pat = "I'm a Patient";
    this.role_View_Hp = "I'm a Health Professional";
    this.role_View_Parter = 'Partner:';

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
    this.settings_deleteCredentials_PopUp_Title = "Delete your credentials";
    this.settings_deleteCredentials_PopUp_Text = "Do you really want to delete your credentials and log out?";
    this.settings_PopUp_Cancel = 'Cancel';
    this.settings_PopUp_Confirm = 'Confirm';
    this.settings_IOS_NotChange = 'The language can be change in the system settings';
    this.settings_ChkBox_StoreCred = 'Store credentials';
    this.setting_DeleteCredetials = 'Delete credentials';
    this.setting_Credentials = 'Credentials';
    this.setting_Choose_Group = 'Select group';
    this.setting_Selected_Group = 'Choosen group';

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
    this.commThread_No_Section_Choosen_Title = 'No department choosen';
    this.commThread_No_Section_Choosen = 'Please choose a department';
    this.commTread_No_Group_Choosen_Title = 'No group choosen';
    this.commTread_No_Group_Choosen = 'Please select a group to communicate with.';
    this.commThread_exportAppointment_PopUp_Title = "Export Appointment";
    this.commThread_exportAppointment_PopUp_Text = "Do you want to export this appointment into your calendar?";
    this.commThread_exportAppointment_Title = "MIWADO Appointment";
    this.commThread_exportAppointment_Location = "UDEM";
    this.commThread_exportAppointment_Body = "Appointment";
    this.commThread_No_FastingStatus_Choosen_Title ="Fasting";
    this.commThread_No_FastingStatus_Choosen = "Please choose if the patient must be fasting or not.";
    this.commThread_Choose_Message_PopUp = 'Please choose message';
    this.commThread_Message_Sent_Title = 'Sent';
    this.commThread_Message_Sent = 'Your message has been sent.';
    this.commThread_Message_Received_Title = 'New message received.';
    this.commThread_Send_Message = "Send message";

    this.TextBlock_Welcome = 'Welcome';
    this.TextBlock_Patient_Welcome = 'Welcome, UDEM';
    this.TextBlock_at = 'at';
    this.TextBlock_Sincere_regards = 'Sincere regards';
    this.TextBlock_cancelation = 'Appointment cancellations must be made 24 hours in advance.';
    this.TextBlock_cancelation_Costs = 'Cancellations which will not happen atleast 24 hours in advance, will be chared.';
    this.TextBlock_Phonenumber = 'Our phonenumber is 031 632 40 70.';
    this.TextBlock_Place = 'Childrenhospital, Entrance 31, Floor G';
    this.TextBlock_on = 'on';
    this.TextBlock_Reminder_1 = 'Your next appointment is on the ';
    this.TextBlock_Reminder_2 = 'Please be arround ';
    this.TextBlock_Reminder_3 = 'in the';
    this.TextBlock_Reminder_4 = 'Please appear fasting, which means without eating in advance.';
    this.TextBlock_Reminder_5 = 'But you should have the taken your medication, if not told else by the doctor.';
    this.TextBlock_newAppointment_1 = 'You have';
    this.TextBlock_newAppointment_2 = 'an appointment in the department of ';
    this.TextBlock_newAppointment_3 = 'We are located in the ';
    this.TextBlock_newAppointment_4 = 'Please take your medicationlist as well as your insurance card.';
    this.TextBlock_PatientWillCall_1 = 'The appointment of';
    this.TextBlock_PatientWillCall_3 = 'is not possible for me to attend.';
    this.TextBlock_PatientWillCall_2 = 'I will call you for a new appointment';
    this.TextBlock_PatientAfterDate_1 = 'The appointment of';
    this.TextBlock_PatientAfterDate_3 = 'is not possible for me to attend.';
    this.TextBlock_PatientAfterDate_2 = 'Please send me a new appointment after the ';
    this.TextBlock_Change_Backoffice_1 = 'We must inform you that the appointment of the ';
    this.TextBlock_Change_Backoffice_2 = 'isn\'t viable anymore. So we need to change the appointment.';
    this.TextBlock_Change_Backoffice_3 = 'A possible date for the new appointment would be the';
    this.TextBlock_Change_Backoffice_4 = 'Please confirme the newly given date';
    this.TextBlock_PatientwillnotCome_1 = 'I\'am sorry to inform you, but I have to cancel the following appointment';
    this.TextBlock_PatientwillnotCome_2 = '';
    this.TextBlock_AcceptAppointment_1 = 'I would like to confirm the appointment of the';
    this.TextBlock_Man = 'Mr.';
    this.TextBlock_Woman = 'Mrs.';
    this.TextBlock_Diabetology = 'Diabetology';
    this.TextBlock_endocrinology = 'Endocrinology';
    this.TextBlock_nutritional_medicine = 'Nutritional medicine';
    this.TextBlock_metabolism = 'Metabolism';
    this.TextBlock_not_fasting = "Not fasting";
    this.TextBlock_fasting = "Fasting";
    this.TextBlock_UDEM_Team = "Your UDEM";
    this.TextBlock_time_morning = "in the morning";
    this.TextBlock_time_afternoon = "in the afternoon";
    this.TextBlock_time_none = "At any time";
    this.textMessages_DayTime_Title = "Choose daytime";
    this.textMessages_patientCancelationNewDate_DayTime_Info = "Please choose the wanted daytime.";

    this.textMessages_Date_Title = "Choose date";
    this.textMessages_Time_Title = "Set time";
    this.textMessages_changeBackoffice_Date1_Info = "Please choose the date of the previous appointment";
    this.textMessages_changeBackoffice_Date2_Info = "Please choose the date of the new appointment";
    this.textMessages_changeBackoffice_Time_Info = "Please set the time of the appointment";

    this.textMessages_newAppointment_Date_Info = "Please choose the date of the appointment";
    this.textMessages_newAppointment_Time_Info = "Please set the time of the appointment";
    this.textMessages_Select_Department_Title = "Choose the department";
    this.textMessages_newAppointment_Department_Info = "Please choose the department";
    this.textMessages_Fastingstatus_Title = "Should the patient be fasting?";
    this.textMessages_reminder_Fastingstatus_Info = "Please choose if the patient should be fasting.";

    this.impressum_Title = "About the App";
    this.impressum_Contact_Title = "Contact";
    this.TextBlock_time_morning = "in the morning";
    this.TextBlock_time_afternoon = "in the afternoon";
    this.TextBlock_time_none = "At any time";
    this.impressum_Contact_AppName = "MIWADO";
    this.impressum_Contact_BFH = "Berner Fachhochschule";
    this.impressum_Contact_Adress = "Quellgasse 21";
    this.impressum_Contact_City = " 2501 Biel";
    this.impressum_Contact_Email_Title = "Email:";
    this.impressum_HA_Title = "Disclaimer";
    this.impressum_HA_Text_1 = "The information contained on the MIWADO mobile app is for general information purposes only.";
    this.impressum_HA_Text_2 = "MIWADO assumes no responsibility for errors or omissions in the contents on the Service.";
    this.impressum_HA_Text_3 = "In no event shall MIWADO be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. MIWADO reserves the right to make additions, deletions, or modification to the contents on the Service at any time without prior notice.";
    this.impressum_Rights_Title = "Copyright";
    this.impressum_Rights_Text = "For the avoidance of doubt, you must not adapt, edit, change, transform, publish, republish, distribute, redistribute, broadcast, rebroadcast or show or play in public this App or the material on this App (in any form or media) without MIWADO's prior written permission.";
    this.impressum_Data_Title = "Privacy policy";
    this.impressum_Data_Text_1 = "The privacy regulations are based on Article 13 of the Federal Constitution and the data protection regulations (DSG). Personal data is handled secure and discrete and all data is saved on the MIDATA Platform. The data proctection of data which is saved on the MIDATA Platform obligate MIDATA. The data will not be shared unless the person owning the data wants to.";
    this.impressum_Data_Text_2 = "Privacy and security responsibility of the MIDATA Platform belongs to MIDATA.";

    this.dateTimePicker_Ok = "Ok";
    this.dateTimePicker_Cancel = "Cancel";

    this.util_backButton = "Back";

    this.survey_Title = "Survey";

    this.guide_Title = "Manual";
    this.guide_Role_Title = "Choose Role";
    this.guide_Role_Text = "Please choose the role which fits your activity.";
    this.guide_Login_Title = "Login";
    this.guide_Login_Text = "If you want to login in the MIWADO App, you must create a MIWADO Account under the following link demo.midata.coop. ";
    this.guide_export_Title = "Export appointment";
    this.guide_export_Text = "To export an appoinment you have to click on the message with the wanted appointment. The appoinment will be saved in the given device calendar. ";
    this.guide_Settings_Title = "Settings";
    this.guide_Settings_Text1 = "You can change the Language of the App in the Settings if you are using a Android Device. If you use a iPhone must change the Language in the Devicesettings. The suporrtet language are German, French and English. ";
    this.guide_Settings_Text2 = "The logout is located in the settings same as the imprint about the App. ";
  }
}
