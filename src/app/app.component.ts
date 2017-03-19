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
import { ShareService } from '../util/shareService';
import { NotificationService } from '../util/notification/notification';

@Component({
  templateUrl: 'app.html',
  providers: [ShareService, NotificationService]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = RolePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private shareService: ShareService
  ) {
    this.initializeApp();
      shareService.setPatient('','');

    // set our app's pages
  
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
