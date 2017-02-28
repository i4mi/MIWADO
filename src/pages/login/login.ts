import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController} from 'ionic-angular';
import { MidataPersistence } from '../../util/midataPersistence';
import { AlertController } from 'ionic-angular';

import { PatList } from '../patlist/patlist';
import { SettingPage } from '../setting/setting';
import { LANGUAGE } from '../../util/language';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  myForm: FormGroup;
  private username: string;
  private password: string;
  private input: any;
  private lang = LANGUAGE.getInstance();


  constructor(public nav: NavController,  private builder: FormBuilder, public alertCtrl: AlertController) {
      this.myForm = builder.group({
      'username': '',
      'password': ''
     })
   }

   goToSettings(){
     this.nav.push(SettingPage);
   }


  backToRole(){
    this.nav.pop(LoginPage);
  }

  loginMIWADO(formData){
    var mp = MidataPersistence.getInstance();
    mp.login(formData.username, formData.password);
    console.log()
    if(mp.loggedIn() == true){
      this.nav.push(PatList);
    }else{
      let alert = this.alertCtrl.create({
        title: this.lang.login_View_PopUp_Title,
        subTitle: this.lang.login_View_PopUp_Text,
        buttons: ['OK']
      });

      alert.present();
    }
  }
}
