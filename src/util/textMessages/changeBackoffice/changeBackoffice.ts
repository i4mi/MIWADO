import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'

import { Platform } from 'ionic-angular';

import { LANGUAGE } from '../../language.ts';


@Component({
  selector: 'changeBackoffice',
  templateUrl: './changeBackoffice.html'
})

export class ChangeBackoffice {
  private lang = LANGUAGE.getInstance(this.platform);
  private look : any;

  constructor(private nav: NavController, private platform: Platform) {

  }

  }
