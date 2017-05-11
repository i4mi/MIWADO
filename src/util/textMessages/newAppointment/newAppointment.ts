import { NavController, NavParams } from 'ionic-angular';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'

import { Platform, AlertController } from 'ionic-angular';

import { LANGUAGE } from '../../language.ts';
import { ShareService } from '../../shareService';
import { SettingPage } from '../../../pages/setting/setting';
import { CommThreadPage } from '../../../pages/commThread/commThread';

@Component({
  selector: 'newAppointment',
  templateUrl: './newAppointment.html'
})

export class NewAppointment {
  @ViewChild('newAppointment') newAppointment:ElementRef;

  private lang = LANGUAGE.getInstance(this.platform);
  private look : any;
  private displayName : string;
  private displayGender : string;
  private gender : string;
  private senderName : string;
  myDate : String = new Date().toISOString();
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
    console.log(shareService.getPatientDisplayname());


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
    var  retVal = "";

    var innerHTML = this.newAppointment.nativeElement;
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
    retVal = "|" + dateInput + "," + timeInput + "," + selectSection + "|" +
             this.lang.TextBlock_Welcome + ' ' +
             this.displayGender + ' ' +
             this.displayName + ' \n' +
             this.lang.TextBlock_newAppointment_1 + ' ' +
             dateInput + ' ' +
             this.lang.TextBlock_at + ' ' +
             timeInput + ' ' +
             this.lang.TextBlock_newAppointment_2 + ' ' +
             selectSection + '. ' +
             this.lang.TextBlock_newAppointment_3 + ' ' +
             this.lang.TextBlock_Place + ' ' +
             this.lang.TextBlock_newAppointment_4 + ' ' +
             this.lang.TextBlock_cancelation + ' ' +
             this.lang.TextBlock_cancelation_Costs + ' ' +
             this.lang.TextBlock_Phonenumber + ' \n' +
             this.lang.TextBlock_Sincere_regards + ' \n' +
             this.lang.TextBlock_UDEM_Team;

    this.nav.push(CommThreadPage, {
      pat: this.patTemp,
      type: 'newAppointment',
      msg: retVal });

  }

  openSettings(){
    this.nav.push(SettingPage);
  }
}
