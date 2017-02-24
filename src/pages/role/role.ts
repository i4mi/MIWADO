import { Component } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'

import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';


@Component({
  selector: 'page-role',
  templateUrl: 'role.html'
})

export class RolePage {

  constructor(public navCtrl: NavController) {

  }

  chooseRole(event, role){
    var mp = MidataPersistence.getInstance();
    mp.setRole(role);

    this.navCtrl.push(LoginPage);
  }
}
