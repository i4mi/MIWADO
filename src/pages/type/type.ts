import { Component } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'

import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';


@Component({
  selector: 'page-type',
  templateUrl: 'type.html'
})

export class TypePage {

  constructor(public navCtrl: NavController) {

  }

  chooseType(event, type){
    var mp = MidataPersistence.getInstance();
    mp.setRole(type);

    this.navCtrl.push(LoginPage);
  }
}
