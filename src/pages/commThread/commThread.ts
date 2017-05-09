import { Component, ElementRef, ViewChild } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'
import { NavController, NavParams } from 'ionic-angular/index';
import { Storage } from '@ionic/storage';
import { SettingPage } from '../setting/setting';
import { ChooseMsg } from '../chooseMsg/chooseMsg';
import { Calendar } from 'ionic-native';
import { PatList } from '../patlist/patlist';


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
  private hideBackButton = true;
  private messages = new Array<any>();
  private resource = new Array<any>();
  private scrollAt : number;
  private messageSend = false;
  private role = false;

  private displayName : string;
  private displayGender : string;
  private displaysender : string;
  private senderHealthProfesionalName : string;

  private messageToSend: string;

  constructor(private nav: NavController, private shareService: ShareService, public navParams: NavParams,
              private platform: Platform, private storage: Storage, public alertCtrl: AlertController,
              private notificationService: NotificationService) {

	  this.TextBlockChoosen = "";
    this.senderHealthProfesionalName = shareService.getSenderName();
    notificationService.initNotification();

    if(this.mp.getRole() != 'member') {
      this.pat = navParams.get('pat');
      this.role = true;
      console.log('comm thread of patient: ' + this.pat.displayName);
      shareService.setPatient(this.pat.displayName, this.pat.gender);
      this.retreiveCommRes();
    } else {
      this.pat = {
          id: '',
          displayName: this.lang.commThread_my_chat,
          gender: 'none'
      }
      this.settings.getUser().then((user) => {
        this.pat.id = user.auth.owner;
        //SCROLL
        this.scrollAt = 0;
        this.retreiveCommRes();
      });
    }

    this.notificationService.getFCMTokenToNotifyMIDATA(this.pat.id).then((res) => {
      console.log('in Comm Thread page');
      console.log(res);
    });

    if (this.navParams.get('type')) {
      console.log('there is something in nav');
      this.TextBlock = this.navParams.get('type');
      this.TextBlockChoosen = this.navParams.get('type');
      console.log(this.navParams.get('type'));
      this.messageToSend = this.navParams.get('msg');
      console.log(this.navParams.get('msg'));
      this.storeCommRes();
    }
  }

  splitMeta(res: any) {
    var firstChart = res.payload[0].charAt(0);
    if (firstChart == "|") {
      console.log('AIAIAI -- it is newww')
      var splitedString = res.payload[0].split('|');
      return splitedString[1].split(',');
    }
  }

  addToCalendar(message, messagepayload, id){
    var clickedMsg = this.messages[id];
    var messageCategory = clickedMsg.category[0];

    if (messageCategory.text == "MIWADO_Message") {
      if(messageCategory.coding) {
        console.log("MESSAGE TYPE");
        console.log(messageCategory.coding[0].code);
        var code = messageCategory.coding[0].code;
        var meta = this.splitMeta(clickedMsg);

        var date : any;
        var dateSplited : any;
        var time : any;
        var dateTo : any;

        if(code == 'reminder' || code == 'newAppointment') {
          dateSplited = meta[0].split('/');
          date = new Date(parseInt(dateSplited[2])+2000, parseInt(dateSplited[1])-1, dateSplited[0]);

          time = meta[1].split(':');
          date.setHours(parseInt(time[0]));
          date.setMinutes(parseInt(time[1]));

          var asd = date.getTime() + 30*60000;
          dateTo = new Date(asd);
        } else if (code == 'changeBackoffice') {
          dateSplited = meta[1].split('/');
          date = new Date(parseInt(dateSplited[2])+2000, parseInt(dateSplited[1])-1, dateSplited[0]);

          time = meta[2].split(':');
          date.setHours(parseInt(time[0]));
          date.setMinutes(parseInt(time[1]));

          dateTo = new Date(date.getTime() + 30*60000);
        }
      }
    }

    if(this.mp.getRole() == 'member' && this.platform.is('mobile') && clickedMsg.ownership != 'mine'){
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
              date,
              dateTo
            ).then(function (result) {
              console.log(date);
              console.log(dateTo);
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

  goToPatList(){
      this.nav.push(PatList);
  }

  retreiveCommRes() {
    this.mp.retreiveCommRes(this.pat).then((res) => {
      this.resource = res.reverse();
      //this.resource = res;
      console.log("MESSAGES:")
      console.log(res);
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
            if(this.mp.getRole() == 'provider' &&
              this.resource[i].sender.reference.indexOf('Practitioner') > -1) {
              this.resource[i].ownership = 'otherHp';
            } else if (this.mp.getRole() == 'member'){
              this.resource[i].sender.display = this.lang.commThread_exportAppointment_Location;
              this.resource[i].ownership = 'other';
            } else {
              this.resource[i].ownership = 'other';
            }
          }

          var date = new Date(this.resource[i].sent);
          var day = date.getDate().toString();
          var m = date.getMonth() + 1;
          var month = m.toString();
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

          var displayMsg = this.splitDisplay(this.resource[i]);
          this.resource[i].messageDisplay = displayMsg;

          this.messages.push(this.resource[i]);

          /*for (var j = this.scrollAt; j < 5; j++) {
            if (this.scrollAt < this.resource.length) {
              this.messages.push(this.resource[j]);
              this.scrollAt ++;
            } else {
              this.scrollAt = this.resource.length;
            }
          }*/
          //this.messageWindow.scrollToBottom(300);
        }

        if (this.messageSend) {
          this.messageSend = false;
          let alert = this.alertCtrl.create({
            title: this.lang.commThread_Message_Sent_Title,
            subTitle: this.lang.commThread_Message_Sent,
            buttons: ['OK']
          });

          alert.present();
        }

        setTimeout(() => {
          this.messageWindow.scrollToBottom();
        }, 500);
      });

    }).catch((ex) => {
    console.error('Error fetching users', ex);
    });
  }

  splitDisplay(res: any) {
    var firstChart = res.payload[0].charAt(0);
    if (firstChart == "|") {
      console.log('AIAIAI -- it is newww')
      var splitedString = res.payload[0].split('|');
      return splitedString[2];
    } else {
      return res.payload[0];
    }
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    infiniteScroll.position = "top";

    setTimeout(() => {
      let max = this.scrollAt + 3;
      for (var i = this.scrollAt; i < max; i++) {
        if (this.scrollAt < this.resource.length) {
          this.messages.push(this.resource[i]);
          this.scrollAt ++;
          this.messageWindow.scrollToBottom(300);
        } else {
          this.scrollAt = this.resource.length;
          infiniteScroll.enable(false);
        }
      }
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 200);

    /*setTimeout(() => {
      this.messageWindow.scrollToBottom(300);
    }, 500);*/
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
      //console.log('Group nr: ' + i + ' name: ' + res[i].name);
      this.settings.getGroup().then((group) => {
        for(var i = 0; i < res.length; i++) {
          if(!group) {
            //console.log('no group choosen in settings');
            let alert = this.alertCtrl.create({
              title: this.lang.commTread_No_Group_Choosen_Title,
              subTitle: this.lang.commTread_No_Group_Choosen,
              buttons: ['OK']
            });
            return alert.present();
          } else if(res[i].name == group) {
            group = res[i];
            this.settings.getUser().then((user) => {
              this.messageSend = true;
              var commRes = this.defineCommRes(user.auth.owner, group);
            });
          }
        }
      });

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
    var meds = new Array<any>();
    var sent = new Date();
    var subj = {"reference":"Patient/" + this.pat.id};
    var tg = {
      "coding" : [{
                    "system" : "MIWADO", // Identity of the terminology system
                    "version" : "1.0", // Version of the system - if relevant
                    "code" : this.TextBlockChoosen , // Symbol in syntax defined by the system
                    "display" : this.TextBlockChoosen , // Representation defined by the system
                    "userSelected" : false // If this coding was chosen directly by the user
                  }], // Code defined by a terminology system
      "text" :  "MIWADO_Message"// Plain text representation of the concept
    }
    var sendr = "";

    if(this.mp.getRole() == 'provider') {
      sendr = 'Practitioner/' + usrId;
      rec.push({"reference":"Patient/" + this.pat.id, "display": this.pat.displayName });
    } else {
      sendr = 'Patient/' + usrId;
    }

    rec.push({"reference":"Group/" + grp.id });

    var text = this.messageToSend;
    if (text == '') {
      return '';
    }
    content.push({'contentString' : text});

    var med = {
      "coding" : [{ "type": "APP" }], // Code defined by a terminology system
      "text" :  "MIWADO"// Plain text representation of the concept
    };

    meds.push(med);

    var commRes = {
      resourceType:'Communication',
      category:tg,
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

      if (this.mp.getRole() != 'member') {
        this.notificationService.getFCMTokenToNotifyMIDATA(this.pat.id).then((res) => {
          console.log('in Comm Thread page');
          console.log(res);

          let not = {
            title: this.lang.commThread_Message_Received_Title,
            type: 'NEWMSG'
          } as MiwadoTypes.Notification;

          for(var i = 0; i < res.length; i++) {
            this.notificationService.notify(not, res[i]).then((result) => {
              console.log('done notify');
            }).catch((ex) => {
              console.error('Error while send notification', ex)
            });
          }
        }).catch((ex) => {
          console.error('Error while get FCM token: ', ex);
        });
      }
      this.retreiveCommRes();
    }).catch((ex) => {
      console.error('Error while saving comm res: ', ex);
    });
  }
   chooseMsg(){
     this.nav.push(ChooseMsg, {
       pat: this.pat
     });
   }

   openSettings(){
     this.nav.push(SettingPage);
   }

  }
