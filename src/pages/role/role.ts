import { Component } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SettingPage } from '../setting/setting';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LANGUAGE } from '../../util/language';
import { ShareService } from '../../util/shareService';
import { Settings } from '../../util/settings';

@Component({
  selector: 'page-role',
  templateUrl: 'role.html'
})

/*
* Class role
* This class stores the choosen Role in the storage
*
* Version:    1.0
* Author(s):  isels1, zyssm4
* Date:       Builded 15.06.2017
*/

export class RolePage {
  private lang = LANGUAGE.getInstance(this.platform, this.storage);
  private settings = Settings.getInstance(this.platform, this.storage);
  private mp = MidataPersistence.getInstance();
  private hideBackButton = true;

  constructor(private nav: NavController, private shareService: ShareService, private platform: Platform,
              private storage: Storage) {

      console.log('what is tk?? ');
      //console.log(tk);
    }

  chooseRole(event, role){
    this.settings.setRole(role).then((user) => {
      console.log('role is set to: ' + role);
      this.mp.setRole(role);

      this.nav.push(LoginPage);
    }).catch((err) => {
      console.error(err);
    });
  }

  openSettings(){
    this.nav.push(SettingPage);
  }
}
