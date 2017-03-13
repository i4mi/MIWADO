import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'

import { Platform } from 'ionic-angular';

import { LANGUAGE } from '../../language.ts';
import { ShareService } from '../../shareService';


@Component({
  selector: 'changeBackoffice',
  templateUrl: './changeBackoffice.html'
})

export class ChangeBackoffice {
  private lang = LANGUAGE.getInstance(this.platform);
  private look : any;
  private displayName : string;
  private displayGender : string;
  private gender : string;
  private senderName: string;

  constructor(private nav: NavController, private shareService: ShareService, private platform: Platform) {
    this.gender = shareService.getPatientGender();
    this.displayName =  shareService.getPatientDisplayname();
    this.senderName = shareService.getSenderName();

    if(this.gender == "male"){
      this.displayGender = this.lang.TextBlock_Man;
    } else if(this.gender == "female"){
      this.displayGender = this.lang.TextBlock_Woman;
    }else{
      this.displayGender = "";
    }
  }

  }
