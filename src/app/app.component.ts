import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { RolePage } from '../pages/role/role';
import { LoginPage } from '../pages/login/login';
import { PatList } from '../pages/patlist/patlist';
import { SettingPage } from '../pages/setting/setting';
import { CommThreadPage } from '../pages/commThread/commThread';
import { CancelationPatient } from '../util/textMessages/cancelationPatient/cancelationPatient';
import { ChangeBackoffice } from '../util/textMessages/changeBackoffice/changeBackoffice';
import { Confirmation } from '../util/textMessages/confirmation/confirmation';
import { NewAppointment } from '../util/textMessages/newAppointment/newAppointment';
import { PatientCancelationNewDate } from '../util/textMessages/patientCancelationNewDate/patientCancelationNewDate';
import { PatientCancelationWillCall } from '../util/textMessages/patientCancelationWillCall/patientCancelationWillCall';
import { Reminder } from '../util/textMessages/reminder/reminder';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = RolePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      { title: 'MIWADO', component: RolePage },
      { title: 'patList', component: PatList },
      { title: 'setting', component: SettingPage },
      { title: 'commThread', component: CommThreadPage },
      { title: 'cancelationPatient', component: CancelationPatient },
      { title: 'changeBackoffice', component: ChangeBackoffice },
      { title: 'confirmation', component: Confirmation },
      { title: 'newAppointment', component: NewAppointment },
      { title: 'patientCancelationNewDate', component: PatientCancelationNewDate },
      { title: 'patientCancelationWillCall', component: PatientCancelationWillCall },
      { title: 'reminder', component: Reminder }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
