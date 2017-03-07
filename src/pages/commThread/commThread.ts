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

  constructor(private nav: NavController, private shareService: ShareService, public navParams: NavParams, private platform: Platform, private storage: Storage, public alertCtrl: AlertController) {




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


    this.options =[
        {
          "name" : this.lang.commThread_TextBlock_Title_NewAppointment,
          "tag" : "newAppointment"
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Confirmation,
          "tag" : "confirmation"
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Change_BackOffice,
          "tag" : "changeBackoffice"
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
          "name" : this.lang.commThread_TextBlock_Title_Reminder,
          "tag" : "reminder"
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Cancellation,
          "tag" : "cancelationPatient"
        }
    ]
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
    if (this.TextBlockChoosen == 'cancelationPatient') {
      console.log(this.cancelationPatient.nativeElement);
    } else if (this.TextBlockChoosen == 'confirmation') {
      console.log(this.confirmation.nativeElement);
    } else if (this.TextBlockChoosen == 'newAppointment') {
      console.log(this.newAppointment.nativeElement);
    } else if (this.TextBlockChoosen == 'patientCancelationNewDate') {
      console.log(this.patientCancelationNewDate.nativeElement);
    } else if (this.TextBlockChoosen == 'patientCancelationWillCall') {
      console.log(this.patientCancelationWillCall.nativeElement);
    } else if (this.TextBlockChoosen == 'reminder') {
      console.log(this.reminder.nativeElement);
    } else if (this.TextBlockChoosen == 'changeBackoffice') {
      console.log(this.changeBackoffice.nativeElement);
    }

    document.getElementById(this.TextBlockChoosen).hidden = true;
    return '';
  }

   openSettings(){
     this.nav.push(SettingPage);
   }

  }
