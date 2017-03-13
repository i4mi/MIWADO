import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'

import { Platform } from 'ionic-angular';

import { LANGUAGE } from '../../language.ts';
import { ShareService } from '../../shareService';


@Component({
  selector: 'cancelationPatient',
  templateUrl: './cancelationPatient.html'
})

export class CancelationPatient {
  private lang = LANGUAGE.getInstance(this.platform);
  private look : any;
  private patientSenderName : string ;
  constructor(private nav: NavController,  private shareService: ShareService, private platform: Platform) {
    this.patientSenderName =   shareService.getSenderPatient();

  }

  }
