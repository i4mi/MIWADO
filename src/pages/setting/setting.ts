import { Component } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'
import { AlertController } from 'ionic-angular';

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

  constructor(public nav: NavController, public alertCtrl: AlertController) {
   }

  backToPatList(){
    this.nav.pop();
  }

  logout(){
    var mp = MidataPersistence.getInstance();

    let alert = this.alertCtrl.create({
    title: this.lang.settings_PopUp_Title,
    message: this.lang.settings_PopUp_Text,
    buttons: [
      {
        text: this.lang.settings_PopUp_Cancel,
        handler: () => {
        }
      },
      {
        text: this.lang.settings_PopUp_Confirm,
        handler: () => {
          mp.logout();
        }
      }
    ]
  });
  alert.present();
  }

  setLanguage(language_code){
    this.settings.setLanguage(language_code)
  }
}
