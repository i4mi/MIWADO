import { Component } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'

import { NavController, NavParams } from 'ionic-angular';

import { LANGUAGE } from '../../util/language';


@Component({
  selector: 'page-commThread',
  templateUrl: 'commThread.html'
})

export class CommThreadPage {
  private lang = LANGUAGE.getInstance();

  constructor(private nav: NavController) {
  }
}
