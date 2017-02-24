import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  private username: string;
  private password: string;
  private input: any;
  // selectedItem: any;
  // icons: string[];
  // items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController) {
    /*if (this.role == 'member') {
      this.username = 'Patient1@midata.coop';
      this.password = 'Patient123456!';
    } else if (this.role == 'provider') {
      this.username = 'donald.mallard@midata.coop';
      this.password = 'Hp123456!';
    }*/

    this.input.push(
      {
        user: this.username,
        pw: this.password
      }
    );
  //   // If we navigated to this page, we will have an item available as a nav param
  //   this.selectedItem = navParams.get('item');
  //
  //   this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
  //   'american-football', 'boat', 'bluetooth', 'build'];
  //
  //   this.items = [];
  //   for(let i = 1; i < 11; i++) {
  //     this.items.push({
  //       title: 'Item ' + i,
  //       note: 'This is item #' + i,
  //       icon: this.icons[Math.floor(Math.random() * this.icons.length)]
  //     });
  //   }
   }

   loigin(event) {

    //this.navCtrl.push(ItemDetailsPage, {
      //item: item
    //});
  }
}
