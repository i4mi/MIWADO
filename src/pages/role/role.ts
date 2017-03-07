import { Component } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SettingPage } from '../setting/setting';

import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { LANGUAGE } from '../../util/language';


@Component({
  selector: 'page-role',
  templateUrl: 'role.html'
})

export class RolePage {
  private lang = LANGUAGE.getInstance(this.platform, this.storage);
  private mp = MidataPersistence.getInstance();

  constructor(private nav: NavController, private platform: Platform, private storage: Storage) {
    if(this.mp.loggedIn()) {
      this.nav.push(LoginPage);
    }
  }

  chooseRole(event, role){
    var mp = MidataPersistence.getInstance();
    mp.setRole(role);
    console.log(this.nav)
    console.log('role is set to: ' + role);

    this.nav.push(LoginPage);
  }

  openSettings(){
    this.nav.push(SettingPage);
  }
}
