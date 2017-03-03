import { Component } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence';
import { Platform } from 'ionic-angular';

import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { LANGUAGE } from '../../util/language';


@Component({
  selector: 'page-role',
  templateUrl: 'role.html'
})

export class RolePage {
  private lang = LANGUAGE.getInstance(this.platform);

  constructor(private nav: NavController, private platform: Platform) {
  }

  chooseRole(event, role){
    var mp = MidataPersistence.getInstance();
    mp.setRole(role);
    console.log(this.nav)
    console.log('role is set to: ' + role);

    this.nav.push(LoginPage);
  }
}
