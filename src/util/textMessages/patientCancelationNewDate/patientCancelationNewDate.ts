import { NavController, NavParams } from 'ionic-angular';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'

import { Platform, AlertController } from 'ionic-angular';

import { LANGUAGE } from '../../language.ts';
import { ShareService } from '../../shareService';
import { SettingPage } from '../../../pages/setting/setting';
import { CommThreadPage } from '../../../pages/commThread/commThread';

@Component({
  selector: 'patientCancelationNewDate',
  templateUrl: './patientCancelationNewDate.html'
})

export class PatientCancelationNewDate {
  @ViewChild('patientCancelationNewDate') patientCancelationNewDate:ElementRef;

  private lang = LANGUAGE.getInstance(this.platform);
  private look : any;
  private patientSenderName : string ;
  myDate : String = new Date().toISOString();

  private patTemp : any;

  constructor(private nav: NavController,
              private shareService: ShareService,
              private platform: Platform,
              private alertCtrl: AlertController,
              private navParams: NavParams) {


      this.patTemp = this.navParams.get('pat');
      this.patientSenderName =   shareService.getSenderPatient()

  }

  checkAndSendMessage() {
    var retVal = "";

    var innerHTML = this.patientCancelationNewDate.nativeElement;

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
    var dateInput2 = innerHTML.getElementsByClassName('datetime-text')[2].innerText;
    console.log(dateInput2);
    if(dateInput2 == '') {
      let alert = this.alertCtrl.create({
        title: this.lang.commThread_No_Date_Choosen_Title,
        subTitle: this.lang.commThread_No_Date_Choosen,
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

    retVal = '|' + dateInput + ',' + timeInput  + ',' + dateInput2 + '|' +
             this.lang.TextBlock_Patient_Welcome + ' \n' +
             this.lang.TextBlock_PatientAfterDate_1 + ' ' +
             dateInput + ' ' +
             this.lang.TextBlock_at  + ' ' +
             timeInput + ' ' +
             this.lang.TextBlock_PatientAfterDate_3 + ' ' +
             this.lang.TextBlock_PatientAfterDate_2 + ' ' +
             dateInput2 + ' ' + selectSection + '. \n' +
             this.lang.TextBlock_Sincere_regards + ' \n' +
             this.patientSenderName;


    this.nav.push(CommThreadPage, {
    pat: this.patTemp,
    type: 'patientCancelationNewDate',
    msg: retVal });

  }

  openSettings(){
    this.nav.push(SettingPage);
  }

}
