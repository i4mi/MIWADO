import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { MidataPersistence } from '../../util/midataPersistence';

import { PatList } from '../patlist/patlist';
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


  constructor(public nav: NavController,  private builder: FormBuilder) {
      this.myForm = builder.group({
      'username': '',
      'password': ''
     })


   }

   backToRole(){
     this.nav.pop(LoginPage);
   }

   loginMIWADO(formData){
     var mp = MidataPersistence.getInstance();
     mp.login(formData.username, formData.password);
     this.nav.push(PatList);
   }
}
