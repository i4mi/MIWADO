import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'back-button',
    templateUrl: './testComp.html'
})
export class BackButtonComponent {
    @Input() text: string;

    // Customizations for the optional confirmation alert
    @Input() confirm: boolean = false;
    @Input() confirmText: string = 'Are you sure?';
    @Input() confirmButtonOk: string = 'Ok';
    @Input() confirmButtonCancel: string = 'Cancel';

    constructor(
            private nav: NavController) {}

    click(evt) {
        console.log('wiiuuwiiiu');
    }
}
