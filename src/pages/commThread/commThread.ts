import { Component } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'

import { NavController, NavParams } from 'ionic-angular';
import * as MiwadoTypes from '../../util/typings/MIWADO_Types';
import * as MidataTypes from '../../util/typings/MIDATA_Types';


import { LANGUAGE } from '../../util/language';


@Component({
  selector: 'page-commThread',
  templateUrl: 'commThread.html'
})

export class CommThreadPage {
  private lang = LANGUAGE.getInstance();
  private mp = MidataPersistence.getInstance();

  private pat:MiwadoTypes.MIWADO_Patient;


  constructor(private nav: NavController, public navParams: NavParams) {
    this.pat = navParams.get('pat');

    console.log('comm thread of patient: ' + this.pat.displayName);
    this.retreiveCommRes();
  }

  retreiveCommRes() {
    this.mp.retreiveCommRes(this.pat);
  }
}
