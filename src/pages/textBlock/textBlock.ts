import { Component } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'
import { Storage } from '@ionic/storage';

import { NavController, NavParams, Platform } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { LANGUAGE } from '../../util/language';


@Component({
  selector: 'page-textBlock',
  templateUrl: 'textBlock.html'
})

export class TextBlockPage {
  private lang = LANGUAGE.getInstance(this.platform, this.storage);
  private look : any;

  constructor(private nav: NavController, private params: NavParams, private platform: Platform, private storage: Storage) {
    console.log(params.data.textBlockType);
  }

  }
