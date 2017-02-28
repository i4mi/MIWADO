import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { LANGUAGE } from '../../util/language';
import { MidataPersistence } from '../../util/midataPersistence';
import * as MiwadoTypes from '../../util/typings/MIWADO_Types';

@Component({
  selector: 'patlist-page',
  templateUrl: 'patlist.html'
})

export class PatList {
  private lang = LANGUAGE.getInstance();
  private mp = MidataPersistence.getInstance();
  private patList: Array<MiwadoTypes.MIWADO_Patient>

  constructor(private nav: NavController) {
    console.log(this.nav);

    // auto-login for debug reason
    if (!this.mp.loggedIn()) {
      this.mp.setRole('provider');
      this.mp.login('donald.mallard@midata.coop', 'Hp123456!').then(
        function(res) {
          console.log("Bearer " + res.authToken);
          this.retreivePatientList();
        });
    } else {
      this.retreivePatientList();
    }
  }

  retreivePatientList() {
    console.log('logged in...');
    console.log('...now retreive Patient List...');

    if (this.mp.loggedIn()) {
      this.mp.retreivePatients(this.addPatientList);
    }
    /*.then(function (res) {
      this.addPatientList(res)
    });*/
  }

  addPatientList(response) {
    console.log('response is: ' + JSON.stringify(response));
    this.patList.push(response);
  }

}
