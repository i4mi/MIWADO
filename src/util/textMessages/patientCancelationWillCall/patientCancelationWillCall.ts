import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'

import { Platform } from 'ionic-angular';

import { LANGUAGE } from '../../language.ts';


@Component({
  selector: 'patientCancelationWillCall',
  templateUrl: './patientCancelationWillCall.html'
})

export class PatientCancelationWillCall {
  private lang = LANGUAGE.getInstance(this.platform);
  private look : any;

  constructor(private nav: NavController, private platform: Platform) {

  }

  }
