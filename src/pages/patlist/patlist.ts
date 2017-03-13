import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController, NavParams, Platform } from 'ionic-angular';
import { CommThreadPage } from '../commThread/commThread';
import { LANGUAGE } from '../../util/language';
import { MidataPersistence } from '../../util/midataPersistence';
import { SettingPage } from '../setting/setting';
import * as MiwadoTypes from '../../util/typings/MIWADO_Types';

import { Settings } from '../../util/settings';
import { ShareService } from '../../util/shareService';


@Component({
  selector: 'patlist-page',
  templateUrl: 'patlist.html'
})

export class PatList {
  private settings = Settings.getInstance(this.platform, this.storage);
  private lang = LANGUAGE.getInstance(this.platform, this.storage);
  private mp = MidataPersistence.getInstance();
  private patList: Array<MiwadoTypes.MIWADO_Patient>;
  private displaysender : string;

  constructor(private nav: NavController, private shareService: ShareService, private platform: Platform, private storage: Storage) {
    shareService.setRole(this.mp.getRole());
    if(this.mp.getRole() == 'member') {
      this.nav.push(CommThreadPage);
    }

    this.settings.getUser().then((user) => {
      var resource : string;
      if(this.mp.getRole() == 'provider') {
        resource = 'Group';
      } else {
        resource = 'Patient';
      }

  /*  var params = {
        user.auth.owner
      }*/

      this.mp.search(resource).then((res) => {
        if(resource == 'Group'){
      for (var i = 0; i < res[0].member.length; i++) {
          if(res[0].member[i].entity.reference == "Practitioner/" + user.auth.owner) {
            this.displaysender = res[0].member[i].entity.display;
            shareService.setSender(this.displaysender);
          }
        }
    }else{
      shareService.setSenderPatient(res["0"].name["0"].given["0"], res["0"].name["0"].family)
    }
    });
    });

    this.patList = new Array<MiwadoTypes.MIWADO_Patient>();
    if(this.mp.getRole() == 'provider') {
      this.retreivePatientList();
    }
  }

  openSettings(){
    this.nav.push(SettingPage);
  }

  retreivePatientList() {
    console.log('logged in...');
    console.log('...now retreive Patient List...');

    if (this.mp.loggedIn()) {
      this.mp.retreivePatients().then((result) => {
        this.addPatientList(result);
      }).catch((ex) => {
      console.error('Error fetching users', ex);
      });
    }
  }

  addPatientList(response: Array<MiwadoTypes.MIWADO_Patient>) {
    console.log('response is: ' + JSON.stringify(response));
    for (var i = 0; i < response.length; i++) {
        this.patList.push(response[i]);
    }

    console.log(this.patList);
  }

  commThread(pat) {
    this.nav.push(CommThreadPage, {
      pat: pat
    });
  }

}
