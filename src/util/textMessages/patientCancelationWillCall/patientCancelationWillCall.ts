import { NavController, NavParams } from 'ionic-angular';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'

import { Platform, AlertController } from 'ionic-angular';

import { LANGUAGE } from '../../language.ts';
import { ShareService } from '../../shareService';
import { SettingPage } from '../../../pages/setting/setting';
import { CommThreadPage } from '../../../pages/commThread/commThread';


@Component({
  selector: 'patientCancelationWillCall',
  templateUrl: './patientCancelationWillCall.html'
})

export class PatientCancelationWillCall {
  @ViewChild('patientCancelationWillCall') patientCancelationWillCall:ElementRef;

  private lang = LANGUAGE.getInstance(this.platform);
  private look : any;
  private patientSenderName : string ;

  private patTemp : any;

  constructor(private nav: NavController,
              private shareService: ShareService,
              private platform: Platform,
              private alertCtrl: AlertController,
              private navParams: NavParams) {


      this.patTemp = this.navParams.get('pat');
      this.patientSenderName =  shareService.getSenderPatient()

  }

  checkAndSendMessage() {
    var retVal = '|' + '|' +
             this.lang.TextBlock_Patient_Welcome + ' \n' +
             this.lang.TextBlock_PatientWillCall_1 + ' ' +
             this.lang.TextBlock_PatientWillCall_2 + ' \n' +
             this.lang.TextBlock_Sincere_regards + ' \n' +
             this.patientSenderName + '.';

    this.nav.push(CommThreadPage, {
    pat: this.patTemp,
    type: 'patientCancelationWillCall',
    msg: retVal });

  }

  openSettings(){
    this.nav.push(SettingPage);
  }

  }
