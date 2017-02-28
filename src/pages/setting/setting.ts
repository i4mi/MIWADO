import { Component } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'

import { NavController, NavParams } from 'ionic-angular';

import { LANGUAGE } from '../../util/language';
import { Settings } from '../../util/settings';

  @Component({
    selector: 'page-setting',
    templateUrl: 'setting.html'
  })

export class SettingPage {
  private lang = LANGUAGE.getInstance();
  private settings = Settings.getInstance();

  constructor(public nav: NavController) {
   }

  backToPatList(){
    this.nav.pop();
  }


  setLanguage(language_code){
    this.settings.setLanguage(language_code)
  }
}
