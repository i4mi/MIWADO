import { Component } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'
import { NavController, NavParams } from 'ionic-angular/index';
import { Storage } from '@ionic/storage';
import { SettingPage } from '../setting/setting';

import * as MiwadoTypes from '../../util/typings/MIWADO_Types';
import * as MidataTypes from '../../util/typings/MIDATA_Types';
import { AlertController, Platform } from 'ionic-angular';
import { Overlay } from 'angular2-modal';

import { TextBlockPage } from '../textBlock/textBlock';
import { LANGUAGE } from '../../util/language';

@Component({
  selector: 'page-commThread',
  templateUrl: 'commThread.html'
})


export class CommThreadPage {

  private lang = LANGUAGE.getInstance(this.platform, this.storage);
  private mp = MidataPersistence.getInstance();
  private innerHtmlVar: string;

  private pat:MiwadoTypes.MIWADO_Patient;

  private TextBlockPopUp: { title: string, subTitle: string };
  private TextBlock: any;
  private options: Array<any>;
  private hideBackButton = false;

  constructor(private nav: NavController, public navParams: NavParams, private platform: Platform, private storage: Storage) {
    if(this.mp.getRole() != 'member') {
      this.pat = navParams.get('pat');
      console.log('comm thread of patient: ' + this.pat.displayName);
      this.retreiveCommRes();
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
          "name" : this.lang.commThread_TextBlock_Title_NewAppointment
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Confirmation
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Change_BackOffice
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Cancellation_Pat_Calling
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Cancellation_Pat_New_Date
        },
        {
          "name" : this.lang.commThread_TextBlock_Title_Reminder
        },
    ]
  }

  retreiveCommRes() {
    this.mp.retreiveCommRes(this.pat);
  }

  optionsTextBlock() {
    //this.innerHtmlVar = '<back-button></back-button>';
    //unhide the html tags

    /*this.nav.push(TextBlockPage, {
      textBlockType: this.TextBlock.name
    });*/
   }

   openSettings(){
     this.nav.push(SettingPage);
   }

  }
