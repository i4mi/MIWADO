import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { RolePage } from '../pages/role/role';
import { LoginPage } from '../pages/login/login';
import { PatList } from '../pages/patlist/patlist';
import { SettingPage } from '../pages/setting/setting';
import { CommThreadPage } from '../pages/commThread/commThread';
import { TextBlockPage } from '../pages/textBlock/textBlock';
import { BackButtonComponent } from '../util/test.component';


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    RolePage,
    LoginPage,
    PatList,
    SettingPage,
    CommThreadPage,
    TextBlockPage,
    BackButtonComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    RolePage,
    LoginPage,
    PatList,
    SettingPage,
    CommThreadPage,
    TextBlockPage,
    BackButtonComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
