import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { LANGUAGE } from '../../util/language';
import { SettingPage } from '../setting/setting';


@Component({
  selector: 'page-impressum',
  templateUrl: './impressum.html'
})

/*
* Class impressum
* This class handels the loading of the ImpressumPage
*
* Version:    1.0
* Author(s):  isels1, zyssm4
* Date:       Builded 15.06.2017
*/

export class ImpressumPage {

  private lang = LANGUAGE.getInstance(this.platform, this.storage);

  constructor(private nav: NavController,
              private navParams: NavParams,
              private platform: Platform,
              private storage: Storage) {


  }

  }
