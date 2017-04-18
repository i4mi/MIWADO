import { Component, ElementRef, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular/index';
import { Platform } from 'ionic-angular';

import { LANGUAGE } from '../../util/language';
import { MidataPersistence } from '../../util/midataPersistence'
import { ShareService } from '../../util/shareService';
import { SettingPage } from '../setting/setting';
import { CommThreadPage } from '../commThread/commThread';

import { Reminder } from '../../util/textMessages/reminder/reminder';
import { NewAppointment } from '../../util/textMessages/newAppointment/newAppointment';
import { ChangeBackoffice } from '../../util/textMessages/changeBackoffice/changeBackoffice';
import { Confirmation } from '../../util/textMessages/confirmation/confirmation';
import { CancelationPatient } from '../../util/textMessages/cancelationPatient/cancelationPatient';
import { PatientCancelationWillCall } from '../../util/textMessages/patientCancelationWillCall/patientCancelationWillCall';
import { PatientCancelationNewDate } from '../../util/textMessages/patientCancelationNewDate/patientCancelationNewDate';


@Component({
  selector: 'page-chooseMsg',
  templateUrl: 'chooseMsg.html'
})

export class ChooseMsg {

  private lang = LANGUAGE.getInstance(this.platform, this.storage);
  private mp = MidataPersistence.getInstance();

  private options: Array<any>;
  private selectedMessage: string;

  //Variables for text-blocks
  private displayName : string;
  private hideBackButton = true;
  private displayGender : string;
  private gender : string;
  private senderName : string;
  private myDate : String = new Date().toISOString();
  private myDateYear : any;
  private myDateYearFutur : any;

  private patTemp : any;


  constructor(private nav: NavController, private shareService: ShareService, public navParams: NavParams,
              private platform: Platform, private storage: Storage) {

    this.patTemp = this.navParams.get('pat');

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
          "tag" : "confirmation",
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Cancellation_Pat_Calling,
          "tag" : "patientCancelationWillCall",
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Cancellation_Pat_New_Date,
          "tag" : "patientCancelationNewDate",
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Cancellation,
          "tag" : "cancelationPatient",
        }
      ]
    }
  }

  openMsg(msgType, event) {
    console.log(msgType);
    console.log(event);
    /*if(this.selectedMessage != ""){
      document.getElementById(this.selectedMessage).hidden = true;
      document.getElementById(msgType.tag).hidden = false;
      this.selectedMessage = msgType.tag;
    }else{
      document.getElementById(msgType.tag).hidden = false;
      this.selectedMessage = msgType.tag;
    }*/
    if (msgType.tag == 'reminder') {
      this.nav.push(Reminder, {
        pat: this.patTemp
      });
    } else if (msgType.tag == 'newAppointment') {
      this.nav.push(NewAppointment, {
        pat: this.patTemp
      });
    } else if (msgType.tag == 'changeBackoffice') {
      this.nav.push(ChangeBackoffice, {
        pat: this.patTemp
      });
    } else if (msgType.tag == 'confirmation') {
      this.nav.push(Confirmation, {
        pat: this.patTemp
      });
    } else if (msgType.tag == 'patientCancelationWillCall') {
      this.nav.push(PatientCancelationWillCall, {
        pat: this.patTemp
      });
    } else if (msgType.tag == 'patientCancelationNewDate') {
      this.nav.push(PatientCancelationNewDate, {
        pat: this.patTemp
      });
    } else if (msgType.tag == 'cancelationPatient') {
      this.nav.push(CancelationPatient, {
        pat: this.patTemp
      });
    }

  }

  openSettings(){
    this.nav.push(SettingPage);
  }

  goToCommThread(){
  this.nav.push(CommThreadPage);
  }


}
