import { Component } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'
import { AlertController, Platform } from 'ionic-angular';

import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LANGUAGE } from '../../util/language';
import { Settings } from '../../util/settings';
import { WriteMessagePage } from '../pages/writeMessage/writeMessage';


  @Component({
    selector: 'page-setting',
    templateUrl: 'setting.html'
  })

export class SettingPage {
  myForm: FormGroup;
  private radioButton_Language : any;
  private lang = LANGUAGE.getInstance(this.platform);
  private settings = Settings.getInstance(this.platform);
  private disabled = false;

  constructor(public nav: NavController, private builder: FormBuilder,
              public alertCtrl: AlertController, private platform: Platform) {

    var deviceLang = window.navigator.language;
    if (this.platform.is('ios') && this.platform.is('mobile')){
      this.disabled = true;
    }

    this.myForm = builder.group({
      'radioButton_Language' : this.settings.getLanguage()
    })
    this.radioButton_Language = this.myForm.value;
   }

  backToPatList(){
    this.nav.pop();
  }

  storeCredentials() {
    if (this.settings.getStoreCred()) {
      this.settings.setStoreCred(false);
    } else {
      this.settings.setStoreCred(true);
    }
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
    this.settings.setLanguage(language_code);
    this.lang.changeLanguage();
  }
}
