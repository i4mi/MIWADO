import { Component, ElementRef, ViewChild } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'
import { NavController, NavParams } from 'ionic-angular/index';
import { Storage } from '@ionic/storage';
import { SettingPage } from '../setting/setting';

import * as MiwadoTypes from '../../util/typings/MIWADO_Types';
import * as MidataTypes from '../../util/typings/MIDATA_Types';
import { AlertController, Platform } from 'ionic-angular';
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

  constructor(private nav: NavController, private shareService: ShareService, public navParams: NavParams,
              private platform: Platform, private storage: Storage, public alertCtrl: AlertController) {

	  this.TextBlockChoosen = "";

    if(this.mp.getRole() != 'member') {
      this.pat = navParams.get('pat');
      console.log('comm thread of patient: ' + this.pat.displayName);
      this.retreiveCommRes();
      shareService.setPatient(this.pat.displayName, this.pat.gender);
    } else{
      this.hideBackButton = true;
      this.pat = {
          id: '',
          displayName: this.lang.commThread_my_chat,
          gender: 'none'
      }
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
  }

  retreiveCommRes() {
    this.mp.retreiveCommRes(this.pat).then((res) => {
      console.log(res);
    }).catch((ex) => {
    console.error('Error fetching users', ex);
    });
  }

  storeCommRes() {
    console.log('store started');

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
            console.log('Group nr: ' + i + ' name: ' + res[i].name);
            //TODO: SETTINGS FIELD TO ENTER GROUP NAME!!
            if(res[i].name == 'TestHpGrp01') {
              group = res[i];
              this.settings.getUser().then((user) => {
                var commRes = this.defineCommRes(user.auth.owner, group);
              });
            }
          }
          /*this.settings.getUser().then((user) =>{
            for(var i = 0; i < member.length; i++) {
              console.log("Group member nr: " + i + " name: " + member[i].entity.display + " id: " + member[i].entity.reference);
              if(member[i].entity.reference.includes(user.auth.owner)){
                console.log('this is logged in user: ' + member[i].entity);
              } else {
                console.log('users (member of group) to add to receipient: ' + member[i].entity);
              }
            }
          }).catch((ex) => {
          console.error('Error fetching group members', ex);
        });*/

    }).catch((ex) => {
      console.error('Error fetching group members', ex);
    })

  }

  optionsTextBlock() {
    console.log(this.TextBlock.tag)

    if(this.TextBlockChoosen != ""){
      document.getElementById(this.TextBlockChoosen).hidden = true;
      document.getElementById(this.TextBlock.tag).hidden = false;
      this.TextBlockChoosen = this.TextBlock.tag;
    }else{
      document.getElementById(this.TextBlock.tag).hidden = false;
      this.TextBlockChoosen = this.TextBlock.tag;
    }
  }

  defineCommRes(usrId: string, grp: any){
    var commRes:MidataTypes.MIDATA_HL7CommRes;
    var sendr:MidataTypes.MIDATA_HL7CommRes_Person;
    var rec = new Array<any>();
    var content = new Array<any>();

    sendr = {
      reference: '',
      display: ''
    }

    if(this.mp.getRole() == 'provider') {
      sendr.reference = 'Practitioner/' + usrId;
      rec.push({"reference":"Patient/" + this.pat.id, "display": this.pat.displayName });
    } else {
      sendr.reference = 'Patient/' + usrId;
    }

    rec.push(grp);

    content.push(this.getText());

    /*commRes = {
      resourceType: 'Communication',
      category: this.TextBlock.tag,
      sender:sendr,
      status:'in-progress',
      recipient:rec,
      payload:content,
      medium:Array<MIDATA_HL7CommRes_Medium>;
      encounter:any;
      sent:Date;
      received:Date;
      reason:Array<any>;
      subject:any;
      requestDetail:any;
    }*/
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
               this.lang.TextBlock_PlaceholderName + '.';

    } else if (this.TextBlockChoosen == 'patientCancelationWillCall') {
      // ABSAGE, NEU TELEFON --> NR 2 PAT

      retVal = this.lang.TextBlock_Patient_Welcome + ' ' +
               this.lang.TextBlock_PatientWillCall_1 + ' ' +
               this.lang.TextBlock_PatientWillCall_2 + ' ' +
               this.lang.TextBlock_Sincere_regards + ' ' +
               this.lang.TextBlock_PlaceholderName + '.';

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
               this.lang.TextBlock_PlaceholderName + '.';

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

      var timeInput = innerHTML.getElementsByClassName('selectTime')[0].getElementsByTagName('input')[0].getAttribute('ng-reflect-model');
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
                this.lang.TextBlock_PlaceholderName + '.';

    } else if (this.TextBlockChoosen == 'newAppointment') {
      innerHTML = this.newAppointment.nativeElement.getElementsByTagName( 'div' )[0];

      var dateInput = innerHTML.getElementsByClassName('selectDate')[0].getElementsByTagName('input')[0].getAttribute('ng-reflect-model');
      console.log(dateInput);
      if(dateInput == null) {
        //TODO: here comes error dingens
        alert('noDate');
        return '';
      }

      var timeInput = innerHTML.getElementsByClassName('selectTime')[0].getElementsByTagName('input')[0].getAttribute('ng-reflect-model');
      console.log(timeInput);
      if(timeInput == null) {
        //TODO: here comes error dingens
        alert('noTime');
        return '';
      }

      var selectSection = innerHTML.getElementsByClassName('selectSection')[0].getElementsByTagName('input')[0];
      console.log(selectSection);
      if(selectSection == null) {
        //TODO: here comes error dingens
        alert('noSection');
        return '';
      }

    } else if (this.TextBlockChoosen == 'reminder') {
      innerHTML = this.reminder.nativeElement.getElementsByTagName( 'div' )[0];
    } else if (this.TextBlockChoosen == 'changeBackoffice') {
      innerHTML = this.changeBackoffice.nativeElement.getElementsByTagName( 'div' )[0];
    }

    console.log(innerHTML);
    console.log(retVal);
    document.getElementById(this.TextBlockChoosen).hidden = true;
    this.TextBlockChoosen = '';
    this.TextBlock = null;

    return retVal;
  }

   openSettings(){
     this.nav.push(SettingPage);
   }

  }
