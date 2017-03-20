import { Component, ElementRef, ViewChild } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'
import { NavController, NavParams } from 'ionic-angular/index';
import { Storage } from '@ionic/storage';
import { SettingPage } from '../setting/setting';
import {Calendar} from 'ionic-native';

import * as MiwadoTypes from '../../util/typings/MIWADO_Types';
import * as MidataTypes from '../../util/typings/MIDATA_Types';
import { AlertController, Platform, Content } from 'ionic-angular';
import { Overlay } from 'angular2-modal';

import { CancelationPatient } from '../../util/textMessages/cancelationPatient/cancelationPatient';
import { ChangeBackoffice } from '../../util/textMessages/changeBackoffice/changeBackoffice';
import { Confirmation } from '../../util/textMessages/confirmation/confirmation';
import { NewAppointment } from '../../util/textMessages/newAppointment/newAppointment';
import { PatientCancelationNewDate } from '../../util/textMessages/patientCancelationNewDate/patientCancelationNewDate';
import { PatientCancelationWillCall } from '../../util/textMessages/patientCancelationWillCall/patientCancelationWillCall';
import { Reminder } from '../../util/textMessages/reminder/reminder';

import { LANGUAGE } from '../../util/language';
import { Settings } from '../../util/settings';
import { ShareService } from '../../util/shareService';
import { NotificationService } from '../../util/notification/notification';


@Component({
  selector: 'page-commThread',
  templateUrl: 'commThread.html'
})


export class CommThreadPage {
  @ViewChild('cancelationPatient') cancelationPatient:ElementRef;
  @ViewChild('confirmation') confirmation:ElementRef;
  @ViewChild('newAppointment') newAppointment:ElementRef;
  @ViewChild('patientCancelationNewDate') patientCancelationNewDate:ElementRef;
  @ViewChild('patientCancelationWillCall') patientCancelationWillCall:ElementRef;
  @ViewChild('reminder') reminder:ElementRef;
  @ViewChild('changeBackoffice') changeBackoffice:ElementRef;
  @ViewChild('messageWindow') messageWindow:Content;

  private lang = LANGUAGE.getInstance(this.platform, this.storage);
  private settings = Settings.getInstance(this.platform, this.storage);
  private mp = MidataPersistence.getInstance();
  private innerHtmlVar: string;

  private pat:MiwadoTypes.MIWADO_Patient;

  private TextBlockPopUp: { title: string, subTitle: string };
  private TextBlock: any;
  private TextBlockChoosen : string;
  private options: Array<any>;
  private hideBackButton = false;
  private messages = new Array<any>();
  private resource = new Array<any>();

  private displayName : string;
  private displayGender : string;
  private displaysender : string;
  private senderHealthProfesionalName : string;
  private senderPatientName : string;

  constructor(private nav: NavController, private shareService: ShareService, public navParams: NavParams,
              private platform: Platform, private storage: Storage, public alertCtrl: AlertController,
              private notificationService: NotificationService) {

	  this.TextBlockChoosen = "";
    this.senderPatientName = shareService.getSenderPatient();
    this.senderHealthProfesionalName = shareService.getSenderName();
    notificationService.initNotification();

    if(this.mp.getRole() != 'member') {
      this.pat = navParams.get('pat');
      console.log('comm thread of patient: ' + this.pat.displayName);
      shareService.setPatient(this.pat.displayName, this.pat.gender);
      this.retreiveCommRes();
    } else{
      this.hideBackButton = true;
      this.pat = {
          id: '',
          displayName: this.lang.commThread_my_chat,
          gender: 'none'
      }
      this.settings.getUser().then((user) => {
        this.pat.id = user.auth.owner;

        this.retreiveCommRes();
      });
    }

    if (this.mp.getRole() == 'provider') {
      this.options = [
          {
            "name" : this.lang.commThread_TextBlock_Title_NewAppointment,
            "tag" : "newAppointment"
          },
          {
            "name" : this.lang.commThread_TextBlock_Title_Change_BackOffice,
            "tag" : "changeBackoffice"
          },
          {
            "name" : this.lang.commThread_TextBlock_Title_Reminder,
            "tag" : "reminder"
          }
      ]
    } else {
      this.options =[
          {
            "name" : this.lang.commThread_TextBlock_Title_Confirmation,
            "tag" : "confirmation"
          },
          {
            "name" : this.lang.commThread_TextBlock_Title_Cancellation_Pat_Calling,
            "tag" : "patientCancelationWillCall"
          },
          {
            "name" : this.lang.commThread_TextBlock_Title_Cancellation_Pat_New_Date,
            "tag" : "patientCancelationNewDate"
          },
          {
            "name" : this.lang.commThread_TextBlock_Title_Cancellation,
            "tag" : "cancelationPatient"
          }
      ]
    }
    this.notificationService.getFCMTokenToNotifyMIDATA(this.pat.id).then((res) => {
      console.log('in Comm Thread page');
      console.log(res);
    });
  }

  addToCalendar(message, messagepayload){
    if(this.mp.getRole() == 'member'){
      var date : any;
      var dateDay : any;
      var dateMonth : any;
      var dateYear : any;
      var time : any;
      var timeHour: any;
      var timeMinute : any;
      var timeSeconds = 0;
      var timeMiliSeconds = 0;
      var startdate : any;
      var enddate : any;

      if(messagepayload.indexOf("<date2>") > 0){
        date = messagepayload.substr(messagepayload.indexOf("<date>")+ 6, 8);
        time =messagepayload.substr(messagepayload.indexOf("<time>") + 6, 5);

        dateDay = date.substr(0,2)
        dateMonth = (parseInt(date.substr(3,2)) - 1).toString();
        dateYear = (parseInt(date.substr(6,2)) + 2000).toString();

        timeHour = time.substr(0,2);
        timeMinute = time.substr(3,2);


      }else{
        date = messagepayload.substr(messagepayload.indexOf("<date>")+ 6, 8);
        time = messagepayload.substr(messagepayload.indexOf("<time>") + 6, 5);

        dateDay = date.substr(0,2)
        dateMonth = (parseInt(date.substr(3,2)) - 1).toString();
        dateYear = (parseInt(date.substr(6,2)) + 2000).toString();

        timeHour = time.substr(0,2);
        timeMinute = time.substr(3,2);

      }
      startdate = new Date(dateYear, dateMonth, dateDay)
      enddate = new Date(dateYear, dateMonth, dateDay)

      startdate.setHours(parseInt(timeHour));
      startdate.setMinutes(parseInt(timeMinute));
      enddate.setHours(parseInt(timeHour));
      enddate.setMinutes(parseInt(timeMinute));
      if( messagepayload.indexOf("<date>") > 0 && messagepayload.indexOf("<time>") > 0 || messagepayload.indexOf("<time>") > 0 && messagepayload.indexOf("<date2>") > 0){
      let alert = this.alertCtrl.create({
      title: this.lang.commThread_exportAppointment_PopUp_Title,
      message: this.lang.commThread_exportAppointment_PopUp_Text,
      buttons: [
        {
          text: this.lang.settings_PopUp_Cancel,
          handler: () => {
          }
        },
        {
          text: this.lang.settings_PopUp_Confirm,
          handler: () => {
            Calendar.createEvent(
              this.lang.commThread_exportAppointment_Title,
              this.lang.commThread_exportAppointment_Location,
              this.lang.commThread_exportAppointment_Body,
              startdate,
              enddate
            ).then(function (result) {
              console.log(startdate)
              console.log(enddate)
                console.log('success');console.dir(result);
              }, function (err) {
                console.log('error');console.dir(err);
              });
          }
        }
      ]
    });
    alert.present();
    }
    }
  }

  retreiveCommRes() {
    this.mp.retreiveCommRes(this.pat).then((res) => {
      this.resource = res.reverse();
      //console.log(res);
      this.settings.getUser().then((user) => {
        this.messages = []
        for(var i = 0; i < this.resource.length; i++) {
          //Sender ID
          var sId = this.resource[i].sender.reference;
          sId = sId.replace("Patient/", "");
          sId = sId.replace("Practitioner/", "");

          if(user.auth.owner == sId) {
            this.resource[i].ownership = 'mine';
          } else {
            this.resource[i].ownership = 'other';
          }

          var date = new Date(this.resource[i].sent);
          var day = date.getDate().toString();
          var month = date.getMonth().toString();
          var years = date.getFullYear().toString();
          var hours = date.getHours().toString();
          var minutes = date.getMinutes().toString();

          if (day.length == 1) {
            day = "0" + day;
          }
          if (month.length == 1) {
            month = "0" + month;
          }
          if (hours.length == 1) {
            hours = "0" + hours;
          }
          if (minutes.length == 1) {
            minutes = "0" + minutes;
          }

          this.resource[i].sent = hours + ":" + minutes + " - " +
                                  day + "." + month + "." + years;

          this.messages.push(this.resource[i]);
          this.messageWindow.scrollToBottom();
          //console.log(this.messages);
        }
      });

    }).catch((ex) => {
    console.error('Error fetching users', ex);
    });
  }

  storeCommRes() {
    //console.log('store started');
    if(this.TextBlock == undefined) {
      let alert = this.alertCtrl.create({
        title: this.lang.commTread_No_Message_Choosen_Title,
        subTitle: this.lang.commTread_No_Message_Choosen,
        buttons: ['OK']
      });

      return alert.present();
    }

    this.mp.search('Group').then((res) => {
      var group: any;
      for(var i = 0; i < res.length; i++) {
        var j = i;
        //console.log('Group nr: ' + i + ' name: ' + res[i].name);
        this.settings.getGroup().then((group) => {
          if(!group) {
            //console.log('no group choosen in settings');
            let alert = this.alertCtrl.create({
              title: this.lang.commTread_No_Group_Choosen_Title,
              subTitle: this.lang.commTread_No_Group_Choosen,
              buttons: ['OK']
            });
            return alert.present();
          } else if(res[j].name == group) {
            group = res[j];
            this.settings.getUser().then((user) => {
              var commRes = this.defineCommRes(user.auth.owner, group);
            });
          }
        });
      }
    }).catch((ex) => {
      console.error('Error fetching group members', ex);
    })
  }

  optionsTextBlock() {
    if(this.TextBlock == undefined){
      let alert = this.alertCtrl.create({
        title: this.lang.commTread_No_Message_Choosen_Title,
        subTitle: this.lang.commTread_No_Message_Choosen,
        buttons: ['OK']
      });

      return alert.present();

    }else{
      if(this.TextBlockChoosen != ""){
        document.getElementById(this.TextBlockChoosen).hidden = true;
        document.getElementById(this.TextBlock.tag).hidden = false;
        this.TextBlockChoosen = this.TextBlock.tag;
      }else{
        document.getElementById(this.TextBlock.tag).hidden = false;
        this.TextBlockChoosen = this.TextBlock.tag;
      }
    }
  }


  defineCommRes(usrId: string, grp: any){
    var rec = new Array<any>();
    var content = new Array<any>();
    var meds = new Array<MidataTypes.MIDATA_HL7CommRes_Medium>();
    var sent = new Date();
    var subj = {"reference":"Patient/" + this.pat.id};
    var tg = this.TextBlockChoosen;
    var sendr = "";

    if(this.mp.getRole() == 'provider') {
      sendr = 'Practitioner/' + usrId;
      rec.push({"reference":"Patient/" + this.pat.id, "display": this.pat.displayName });
    } else {
      sendr = 'Patient/' + usrId;
    }

    rec.push({"reference":"Group/" + grp.id });

    var text = this.getText();
    if (text == '') {
      return '';
    }
    content.push({'contentString' : text});

    var med = {
      type: 'APP',
      name: 'MIWADO'
    } as MidataTypes.MIDATA_HL7CommRes_Medium;

    meds.push(med);

    var commRes = {
      resourceType:'Communication',
      category:{tg},
      sender:sendr,
      status:'in-progress',
      recipient:rec,
      payload:content,
      medium:meds,
      encounter:'',
      sent:sent,
      received:'',
      reason:[{}],
      subject:subj,
      requestDetail:{}
    }

    //console.log(commRes);
    this.mp.save(commRes).then((res) => {
      console.log('stored?? ');
      console.log(res);

      this.notificationService.getFCMTokenToNotifyMIDATA(this.pat.id).then((res) => {
        console.log('in Comm Thread page');
        console.log(res);

        let not = { //TODO: language files!!!
          title: 'New message',
          type: 'NEWMSG',
        } as MiwadoTypes.Notification;
        this.notificationService.notify(not, res).then((result) => {
          console.log('done notify');
        }).catch((ex) => {
          console.error('Error while send notification', ex)
        });
      }).catch((ex) => {
        console.error('Error while get FCM token: ', ex);
      });

      this.retreiveCommRes();
    }).catch((ex) => {
      console.error('Error while saving comm res: ', ex);
    });
  }

  getText(): string {
    var innerHTML: any;
    var retVal: string;
    if (this.TextBlockChoosen == 'confirmation') {
      // BESTÄTIGUNG --> NR 1 PAT
      innerHTML = this.confirmation.nativeElement.getElementsByTagName( 'div' )[0];
      var dateInput = innerHTML.getElementsByClassName('datetime-text')[0].innerText; //.getElementsByTagName('input')[0].getAttribute('ng-reflect-model');
      console.log(dateInput);
      if(dateInput == "") {
        let alert = this.alertCtrl.create({
          title: this.lang.commThread_No_Date_Choosen_Title,
          subTitle: this.lang.commThread_No_Date_Choosen,
          buttons: ['OK']
        });

        alert.present();
        return '';
      }
      retVal = this.lang.TextBlock_Patient_Welcome + ' ' +
               this.lang.TextBlock_AcceptAppointment_1 + ' ' +
               this.lang.TextBlock_on + ' ' +
               '<date>' + dateInput + '</date> ' +
               this.lang.TextBlock_Sincere_regards + ' ' +
               this.senderPatientName + '.';

    } else if (this.TextBlockChoosen == 'patientCancelationWillCall') {
      // ABSAGE, NEU TELEFON --> NR 2 PAT
      retVal = this.lang.TextBlock_Patient_Welcome + ' ' +
               this.lang.TextBlock_PatientWillCall_1 + ' ' +
               this.lang.TextBlock_PatientWillCall_2 + ' ' +
               this.lang.TextBlock_Sincere_regards + ' ' +
               this.senderPatientName + '.';

    } else if (this.TextBlockChoosen == 'patientCancelationNewDate') {
      // ABSAGE, NEU TERMIN --> NR 3 PAT
      innerHTML = this.patientCancelationNewDate.nativeElement.getElementsByTagName( 'div' )[0];
      var dateInput = innerHTML.getElementsByClassName('datetime-text')[0].innerText;
      console.log(dateInput);
      if(dateInput == '') {
        let alert = this.alertCtrl.create({
          title: this.lang.commThread_No_Date_Choosen_Title,
          subTitle: this.lang.commThread_No_Date_Choosen,
          buttons: ['OK']
        });
        alert.present();
        return '';
      }
      retVal = this.lang.TextBlock_Patient_Welcome + ' ' +
               this.lang.TextBlock_PatientAfterDate_1 + ' ' +
               this.lang.TextBlock_PatientAfterDate_2 + ' ' +
               '<date>' + dateInput + '</date> ' +
               this.lang.TextBlock_Sincere_regards + ' ' +
               this.senderPatientName + '.';

    } else if (this.TextBlockChoosen == 'cancelationPatient') {
      // ABSAGE --> NR 4 PAT
      innerHTML = this.cancelationPatient.nativeElement.getElementsByTagName( 'div' )[0];
      var dateInput = innerHTML.getElementsByClassName('datetime-text')[0].innerText;
      console.log(dateInput);
      if(dateInput == "") {
        let alert = this.alertCtrl.create({
          title: this.lang.commThread_No_Date_Choosen_Title,
          subTitle: this.lang.commThread_No_Date_Choosen,
          buttons: ['OK']
        });
        alert.present();
        return '';
      }
      retVal = this.lang.TextBlock_Patient_Welcome + ' ' +
               this.lang.TextBlock_PatientwillnotCome_1 + ' ' +
               this.lang.TextBlock_on + ' ' +
               '<date>' + dateInput + '</date> ';
      var timeInput = innerHTML.getElementsByClassName('datetime-text')[1].innerText;
      console.log(timeInput);
      if(timeInput == "") {
        let alert = this.alertCtrl.create({
          title: this.lang.commThread_No_Time_Choosen_Title,
          subTitle: this.lang.commThread_No_Time_Choosen,
          buttons: ['OK']
        });
        alert.present();
        return '';
      }
      retVal += this.lang.TextBlock_at + ' ' +
                '<time>' + timeInput + '</time> ' +
                this.lang.TextBlock_PatientwillnotCome_2 + ' ' +
                this.lang.TextBlock_Sincere_regards + ' ' +
                this.senderPatientName + '.';

    } else if (this.TextBlockChoosen == 'newAppointment') {
      // NEUER TERMIN --> NR 1 HP
      innerHTML = this.newAppointment.nativeElement.getElementsByTagName( 'div' )[0];
      var dateInput = innerHTML.getElementsByClassName('datetime-text')[0].innerText;
      console.log(dateInput);
      if(dateInput == "") {
        let alert = this.alertCtrl.create({
          title: this.lang.commThread_No_Date_Choosen_Title,
          subTitle: this.lang.commThread_No_Date_Choosen,
          buttons: ['OK']
        });
        alert.present();
        return '';
      }

      var gender = this.shareService.getPatientGender();
      this.displayName =  this.shareService.getPatientDisplayname();

      if(gender == "male"){
        this.displayGender = this.lang.TextBlock_Man;
      } else if(gender == "female"){
        this.displayGender = this.lang.TextBlock_Woman;
      }

      retVal = this.lang.TextBlock_Welcome + ' ' +
               this.displayGender + ' ' +
               this.displayName + ' ' +
               this.lang.TextBlock_newAppointment_1 + ' ' +
               '<date>' + dateInput + '</date> ' +
               this.lang.TextBlock_at + ' ';

      var timeInput = innerHTML.getElementsByClassName('datetime-text')[1].innerText;
      console.log(timeInput);
      if(timeInput == "") {
        let alert = this.alertCtrl.create({
          title: this.lang.commThread_No_Time_Choosen_Title,
          subTitle: this.lang.commThread_No_Time_Choosen,
          buttons: ['OK']
        });

        alert.present();
        return '';
      }
      retVal += '<time>' + timeInput + '</time> ' +
                this.lang.TextBlock_newAppointment_2 + ' ';

      var selectSection = innerHTML.getElementsByClassName('select-text')[0].innerText;
      console.log(selectSection);
      if(selectSection == "") {
        let alert = this.alertCtrl.create({
          title: this.lang.commThread_No_Section_Choosen_Title,
          subTitle: this.lang.commThread_No_Section_Choosen,
          buttons: ['OK']
        });

        alert.present();
        return '';
      }
      retVal += '<section>' + selectSection + '</section> ' +
                this.lang.TextBlock_newAppointment_3 + ' ' +
                this.lang.TextBlock_Place + ' ' +
                this.lang.TextBlock_newAppointment_4 + ' ' +
                this.lang.TextBlock_cancelation + ' ' +
                this.lang.TextBlock_cancelation_Costs + ' ' +
                this.lang.TextBlock_Phonenumber + ' ' +
                this.lang.TextBlock_Sincere_regards + ' ' +
                this.senderHealthProfesionalName + '.';

    } else if (this.TextBlockChoosen == 'changeBackoffice') {
      // Verschieben --> NR 2 HP
      innerHTML = this.changeBackoffice.nativeElement.getElementsByTagName( 'div' )[0];
      var dateInput = innerHTML.getElementsByClassName('datetime-text')[0].innerText;
      console.log(dateInput);
      if(dateInput == "") {
        let alert = this.alertCtrl.create({
          title: this.lang.commThread_No_Date_Choosen_Title,
          subTitle: this.lang.commThread_No_Date_Choosen,
          buttons: ['OK']
        });
        alert.present();
        return '';
      }

      var gender = this.shareService.getPatientGender();
      this.displayName =  this.shareService.getPatientDisplayname();

      if(gender == "male"){
        this.displayGender = this.lang.TextBlock_Man;
      } else if(gender == "female"){
        this.displayGender = this.lang.TextBlock_Woman;
      }

      retVal = this.lang.TextBlock_Welcome + ' ' +
               this.displayGender + ' ' +
               this.displayName + ' ' +
               this.lang.TextBlock_Change_Backoffice_1 + ' ' +
               '<date>' + dateInput + '</date> ' +
               this.lang.TextBlock_Change_Backoffice_2 + ' ' +
               this.lang.TextBlock_Change_Backoffice_3 + ' ';

       var dateInput = innerHTML.getElementsByClassName('datetime-text')[1].innerText;
       console.log(dateInput);
       if(dateInput == "") {
         let alert = this.alertCtrl.create({
           title: this.lang.commThread_No_Date_Choosen_Title,
           subTitle: this.lang.commThread_No_Date_Choosen,
           buttons: ['OK']
         });
         alert.present();
         return '';
       }

      retVal += '<date2>' + dateInput + '</date2> ' +
                this.lang.TextBlock_at + ' ';

      var timeInput = innerHTML.getElementsByClassName('datetime-text')[2].innerText;
      console.log(timeInput);
      if(timeInput == "") {
        let alert = this.alertCtrl.create({
          title: this.lang.commThread_No_Time_Choosen_Title,
          subTitle: this.lang.commThread_No_Time_Choosen,
          buttons: ['OK']
        });

        alert.present();
        return '';
      }
      retVal += '<time>' + timeInput + '</time> ' +
                this.lang.TextBlock_Change_Backoffice_4 + ' ' +
                this.lang.TextBlock_Sincere_regards + ' ' +
                this.senderHealthProfesionalName + '.';

    } else if (this.TextBlockChoosen == 'reminder') {
      // ERINNERUNG --> NR 3 HP
      innerHTML = this.reminder.nativeElement.getElementsByTagName( 'div' )[0];
      var dateInput = innerHTML.getElementsByClassName('datetime-text')[0].innerText;
      console.log(dateInput);
      if(dateInput == "") {
        let alert = this.alertCtrl.create({
          title: this.lang.commThread_No_Date_Choosen_Title,
          subTitle: this.lang.commThread_No_Date_Choosen,
          buttons: ['OK']
        });
        alert.present();
        return '';
      }

      var gender = this.shareService.getPatientGender();
      this.displayName =  this.shareService.getPatientDisplayname();

      if(gender == "male"){
        this.displayGender = this.lang.TextBlock_Man;
      } else if(gender == "female"){
        this.displayGender = this.lang.TextBlock_Woman;
      }


      retVal = this.lang.TextBlock_Welcome + ' ' +
               this.displayGender + ' ' +
               this.displayName + ' ' +
               this.lang.TextBlock_Reminder_1 + ' ' +
               '<date>' + dateInput + '</date> ' +
               this.lang.TextBlock_Reminder_2 + ' ';

      var timeInput = innerHTML.getElementsByClassName('datetime-text')[1].innerText;
      console.log(timeInput);
      if(timeInput == "") {
        let alert = this.alertCtrl.create({
          title: this.lang.commThread_No_Time_Choosen_Title,
          subTitle: this.lang.commThread_No_Time_Choosen,
          buttons: ['OK']
        });

        alert.present();
        return '';
      }

      if(this.shareService.getFastingStatus() != "fasting" || this.shareService.getFastingStatus() != "notfasting") {
        let alert = this.alertCtrl.create({
          title: this.lang.commThread_No_FastingStatus_Choosen_Title,
          subTitle: this.lang.commThread_No_FastingStatus_Choosen,
          buttons: ['OK']
        });

        alert.present();
        return '';
      }

      if( this.shareService.getFastingStatus() == "fasting"){
      retVal += '<time>' + timeInput + '</time> ' +
                this.lang.TextBlock_Reminder_3 + ' ' +
                this.lang.TextBlock_Place + ' ' +
                this.lang.TextBlock_Reminder_4 + ' ' +
                this.lang.TextBlock_Reminder_5 + ' ' +
                this.lang.TextBlock_cancelation + ' ' +
                this.lang.TextBlock_cancelation_Costs + ' ' +
                this.lang.TextBlock_Phonenumber + ' ' +
                this.lang.TextBlock_Sincere_regards + ' ' +
                this.senderHealthProfesionalName + '.';
      }else if(this.shareService.getFastingStatus() == "notfasting"){
        retVal += '<time>' + timeInput + '</time> ' +
                  this.lang.TextBlock_Reminder_3 + ' ' +
                  this.lang.TextBlock_Place + ' ' +
                  this.lang.TextBlock_cancelation + ' ' +
                  this.lang.TextBlock_cancelation_Costs + ' ' +
                  this.lang.TextBlock_Phonenumber + ' ' +
                  this.lang.TextBlock_Sincere_regards + ' ' +
                  this.senderHealthProfesionalName + '.';
      }
    }
    //console.log(innerHTML);
    //console.log(retVal);
    document.getElementById(this.TextBlockChoosen).hidden = true;
    this.TextBlockChoosen = '';
    this.TextBlock = null;

    return retVal;
  }

   openSettings(){
     this.nav.push(SettingPage);
   }

  }
