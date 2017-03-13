import { NavController } from 'ionic-angular/index';
import { Component, Input } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'


import { Platform } from 'ionic-angular';

import { LANGUAGE } from '../../language.ts';
import { ShareService } from '../../shareService';





@Component({
  selector: 'patientCancelationNewDate',
  templateUrl: './patientCancelationNewDate.html'
})

export class PatientCancelationNewDate {
  private lang = LANGUAGE.getInstance(this.platform);
  private look : any;
  private patientSenderName : string ;

  constructor(private nav: NavController, private shareService: ShareService, private platform: Platform) {
    this.patientSenderName =   shareService.getSenderPatient()

  }

  }
