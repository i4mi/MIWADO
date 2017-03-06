import { NavController } from 'ionic-angular/index';
import { Component, Input } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'


import { Platform } from 'ionic-angular';

import { LANGUAGE } from '../../language.ts';


@Component({
  selector: 'patientCancelationNewDate',
  templateUrl: './patientCancelationNewDate.html'
})

export class PatientCancelationNewDate {
  private lang = LANGUAGE.getInstance(this.platform);
  private look : any;
  constructor(private nav: NavController, private platform: Platform) {

  }

  }
