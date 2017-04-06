import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular/index';
import { Platform } from 'ionic-angular';

import { LANGUAGE } from '../../util/language';
import { MidataPersistence } from '../../util/midataPersistence'
import { ShareService } from '../../util/shareService';
import { SettingPage } from '../setting/setting';

@Component({
  selector: 'page-chooseMsg',
  templateUrl: 'chooseMsg.html'
})

export class ChooseMsg {

  private lang = LANGUAGE.getInstance(this.platform, this.storage);
  private mp = MidataPersistence.getInstance();

  private options: Array<any>;
  private selectedMessage: string;

  constructor(private nav: NavController, private shareService: ShareService, public navParams: NavParams,
              private platform: Platform, private storage: Storage) {


    if (this.mp.getRole() == 'provider') {
    this.options = [
        {
          "name" : this.lang.commThread_TextBlock_Title_NewAppointment,
          "tag" : "newAppointment",
          "html": "<p></p>"
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Change_BackOffice,
          "tag" : "changeBackoffice",
          "html": "<p></p>"
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Reminder,
          "tag" : "reminder",
          "html" : "<reminder id='reminder' hidden></reminder>"
        }
    ]
    } else {
    this.options =[
        {
          "name" : this.lang.commThread_TextBlock_Title_Confirmation,
          "tag" : "confirmation",
          "html": ""
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Cancellation_Pat_Calling,
          "tag" : "patientCancelationWillCall",
          "html": ""
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Cancellation_Pat_New_Date,
          "tag" : "patientCancelationNewDate",
          "html": ""
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Cancellation,
          "tag" : "cancelationPatient",
          "html": ""
        }
    ]
    }
  }

  openMsg(msgType, event) {
    console.log(msgType);
    console.log(event);
    if(this.selectedMessage != ""){
      document.getElementById(this.selectedMessage).hidden = true;
      document.getElementById(msgType.tag).hidden = false;
      this.selectedMessage = msgType.tag;
    }else{
      document.getElementById(msgType.tag).hidden = false;
      this.selectedMessage = msgType.tag;
    }
  }

  openSettings(){
    this.nav.push(SettingPage);
  }

}
