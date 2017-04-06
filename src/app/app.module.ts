import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
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
import { ChooseMsg } from '../pages/chooseMsg/chooseMsg';

@NgModule({
  declarations: [
    MyApp,
    RolePage,
    LoginPage,
    PatList,
    SettingPage,
    CommThreadPage,
    CancelationPatient,
    ChangeBackoffice,
    Confirmation,
    NewAppointment,
    PatientCancelationNewDate,
    PatientCancelationWillCall,
    Reminder,
    ChooseMsg
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RolePage,
    LoginPage,
    PatList,
    SettingPage,
    CommThreadPage,
    CancelationPatient,
    ChangeBackoffice,
    Confirmation,
    NewAppointment,
    PatientCancelationNewDate,
    PatientCancelationWillCall,
    Reminder,
    ChooseMsg
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage]
})
export class AppModule {}
