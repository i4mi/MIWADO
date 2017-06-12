import { Component } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'
import { AlertController, Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { LANGUAGE } from '../../util/language';
import { Settings } from '../../util/settings';
import { RolePage } from '../role/role';
import { ShareService } from '../../util/shareService';
import { NotificationService } from '../../util/notification/notification';
import { ImpressumPage } from '../impressum/impressum';

  @Component({
    selector: 'page-setting',
    templateUrl: 'setting.html'
  })


  /*
  * Class setting
  * This class handels the langauge and group setting.
  * The input data is stored in the storage.
  *
  * Version:    1.0
  * Author(s):  isels1, zyssm4
  * Date:       Builded 15.06.2017
  */

export class SettingPage {
  myForm: FormGroup;
  private radioButton_Language : any;
  private lang = LANGUAGE.getInstance(this.platform, this.storage);
  private settings = Settings.getInstance(this.platform, this.storage);
  private mp = MidataPersistence.getInstance();
  private disabled = false;
//  private disableLogout = true;
  private groups = new Array<any>();
  private selectedGroup: string;
  private hideBackButton = true;
  private noStoredCred = false;

  constructor(public nav: NavController, private builder: FormBuilder, private shareService: ShareService,
              public alertCtrl: AlertController, private platform: Platform, private storage: Storage,
              private notificationService: NotificationService) {

    var deviceLang = window.navigator.language;
    if (this.platform.is('ios') && this.platform.is('mobile')){
      this.disabled = true;
    }

    if (this.mp.loggedIn()) {
//      this.disableLogout = false;
      this.mp.search("Group").then((res) => {
        for(var i = 0; i < res.length; i++) {
          console.log('Group nr: ' + i + ' name: ' + res[i].name);
          this.groups.push(res[i]);
        }
        if (!this.selectedGroup && res) {
          this.selectedGroup = res[0].name;
          this.settings.setGroup(this.selectedGroup);
        }
      });
    }
    this.settings.getGroup().then((selectedGroup) => {
      this.selectedGroup = selectedGroup;
    });
    this.myForm = builder.group({
      'radioButton_Language' : this.settings.getLanguage()
    })
    this.radioButton_Language = this.myForm.value;

    this.settings.getUser().then((res) => {
      if (!res && !this.settings.getStoreCred()) {
        this.noStoredCred = true;
      }
    });
   }

  logout(){
    let alert = this.alertCtrl.create({
    title: this.lang.settings_PopUp_Title,
    message: this.lang.settings_PopUp_Text,
    buttons: [
      {
        text: this.lang.settings_PopUp_Cancel,
        handler: () => {
        }
      },
      {
        text: this.lang.settings_PopUp_Confirm,
        handler: () => {
          this.settings.getUser().then((user) => {
            this.notificationService.deleteFCMTokenMIDATA(user.auth.owner).then((deleted) => {
              console.log("credential deleted!!!");
              this.mp.logout();
              this.nav.push(RolePage);
            }).catch((ex) => {
              console.error("Error in delete Credetials: " + ex);
              this.mp.logout()
              this.nav.push(RolePage);
            });
          });
        }
      }
    ]
  });
  alert.present();
  }

  setLanguage(language_code){
    this.settings.setLanguage(language_code);
    this.lang.changeLanguage();
  }

  deleteCredentials(){
    let alert = this.alertCtrl.create({
    title: this.lang.settings_deleteCredentials_PopUp_Title,
    message: this.lang.settings_deleteCredentials_PopUp_Text,
    buttons: [
      {
        text: this.lang.settings_PopUp_Cancel,
        handler: () => {
        }
      },
      {
        text: this.lang.settings_PopUp_Confirm,
        handler: () => {
          this.settings.setUser('', '');
          this.mp.logout();
          this.nav.push(RolePage);
        }
      }
    ]
  });
  alert.present();
  }
  setGroup(selectedGroup){
    this.settings.setGroup(this.selectedGroup);
  }
  impressum() {
    this.nav.push(ImpressumPage);
  }

  survey(){
    if(this.settings.getLanguage() == 'de'){
      window.location.href='https://de.surveymonkey.com/r/M257H36';
    }
    else if(this.settings.getLanguage() == 'fr'){
      window.location.href='https://fr.surveymonkey.com/r/M2HKTBF';
    }
    else if(this.settings.getLanguage() == 'en'){
      window.location.href='https://de.surveymonkey.com/r/M25NYWL';
    }
}
}
