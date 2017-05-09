import { NavController, NavParams } from 'ionic-angular';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'

import { Platform, AlertController } from 'ionic-angular';

import { LANGUAGE } from '../../language.ts';
import { ShareService } from '../../shareService';
import { SettingPage } from '../../../pages/setting/setting';
import { CommThreadPage } from '../../../pages/commThread/commThread';


@Component({
  selector: 'changeBackoffice',
  templateUrl: './changeBackoffice.html'
})

export class ChangeBackoffice {
  @ViewChild('changeBackoffice') changeBackoffice:ElementRef;

  private lang = LANGUAGE.getInstance(this.platform);
  private look : any;
  private displayName : string;
  private displayGender : string;
  private gender : string;
  private senderName: string;
  myDate : String = new Date().toISOString();
  myDate2 : String = new Date().toISOString();
  myDateYear : any;
  myDateYearFutur : any;

  private patTemp : any;

  constructor(private nav: NavController,
              private shareService: ShareService,
              private platform: Platform,
              private alertCtrl: AlertController,
              private navParams: NavParams) {

    this.patTemp = this.navParams.get('pat');

    this.gender = shareService.getPatientGender();
    this.displayName =  shareService.getPatientDisplayname();
    this.senderName = shareService.getSenderName();

    this.myDateYear = this.myDate.substr(0,4);
    this.myDateYearFutur = (parseInt(this.myDateYear) + 20).toString();

    if(this.gender == "male"){
      this.displayGender = this.lang.TextBlock_Man;
    } else if(this.gender == "female"){
      this.displayGender = this.lang.TextBlock_Woman;
    }else{
      this.displayGender = "";
    }
  }

  checkAndSendMessage() {
    var retVal = "";

    var innerHTML = this.changeBackoffice.nativeElement;
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

     var dateInputTo = innerHTML.getElementsByClassName('datetime-text')[1].innerText;
     console.log(dateInputTo);
     if(dateInputTo == "") {
       let alert = this.alertCtrl.create({
         title: this.lang.commThread_No_Date_Choosen_Title,
         subTitle: this.lang.commThread_No_Date_Choosen,
         buttons: ['OK']
       });
       alert.present();
       return '';
     }

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

    //FIRST META
    retVal = "|" + dateInput + "," + dateInputTo + "," + timeInput + "|" +
             this.lang.TextBlock_Welcome + ' ' +
             this.displayGender + ' ' +
             this.displayName + ' \n' +
             this.lang.TextBlock_Change_Backoffice_1 + ' ' +
             dateInput + ' ' +
             this.lang.TextBlock_Change_Backoffice_2 + ' ' +
             this.lang.TextBlock_Change_Backoffice_3 + ' ' +
             dateInputTo + ' ' +
             this.lang.TextBlock_at + ' ' +
             timeInput + ' ' +
             this.lang.TextBlock_Change_Backoffice_4 + ' \n' +
             this.lang.TextBlock_Sincere_regards + ' \n' +
             this.lang.TextBlock_UDEM_Team;


    this.nav.push(CommThreadPage, {
      pat: this.patTemp,
      type: 'changeBackoffice',
      msg: retVal });

  }

  openSettings(){
    this.nav.push(SettingPage);
  }

  }
