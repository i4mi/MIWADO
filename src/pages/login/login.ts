import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LANGUAGE } from '../../util/language';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  private username: string;
  private password: string;
  private input: any;
  private lang = LANGUAGE.getInstance();


  constructor(public nav: NavController) {

   }

   backToRole(){
     this.nav.pop(LoginPage);
   }
}
