import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController} from 'ionic-angular';
import { MidataPersistence } from '../../util/midataPersistence';
import { AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as MiwadoTypes from '../../util/typings/MIWADO_Types';


import { PatList } from '../patlist/patlist';
import { SettingPage } from '../setting/setting';
import { LANGUAGE } from '../../util/language';
import { Settings } from '../../util/settings';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  myForm: FormGroup;
  private username: string;
  private password: string;
  private input: any;
  private lang = LANGUAGE.getInstance(this.platform, this.storage);
  private settings = Settings.getInstance(this.platform, this.storage);
  private mp = MidataPersistence.getInstance();

  constructor(public nav: NavController,  private builder: FormBuilder,
              public alertCtrl: AlertController, private platform: Platform, private storage: Storage) {

      if(this.mp.loggedIn()) {
        this.nav.push(PatList);
      }

      if(this.settings.getStoreCred()){
        var user: MiwadoTypes.MIWADO_User;
        this.settings.getUser().then((res) => {
          user = res;
          this.myForm = builder.group({
          'username': user.username,
          'password': user.password
         })
        });
      }
        this.myForm = builder.group({
        'username': '',
        'password': ''
       })

   }

   openSettings(){
     this.nav.push(SettingPage);
   }

  backToRole(){
    this.nav.pop(LoginPage);
  }

  loginMIWADO(formData){
    var mp = MidataPersistence.getInstance();
    mp.login(formData.username, formData.password).then((res) => {
      console.log('logged in with auth response: ' + JSON.stringify(res));
      if(mp.loggedIn() == true){
        this.settings.setUser(formData.username, formData.password, res).then((res) => {
          if(!this.settings.getStoreCred()) {
            formData.username = '';
            formData.password = '';
          }
          this.nav.push(PatList);
        });
      }
    }).catch((ex) => {
    console.error('Error fetching users', ex);
    let alert = this.alertCtrl.create({
      title: this.lang.login_View_PopUp_Title,
      subTitle: this.lang.login_View_PopUp_Text,
      buttons: ['OK']
    });

    alert.present();
    });;

  }

  storeCredentials() {
    if (this.settings.getStoreCred()) {
      this.settings.setStoreCred(false);
    } else {
      this.settings.setStoreCred(true);
    }
  }
}
