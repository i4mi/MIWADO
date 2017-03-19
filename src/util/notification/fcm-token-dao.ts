import { Injectable } from '@angular/core';
import { FCMToken } from './fcm-token';
import * as moment from 'moment';
import * as _ from 'lodash';


@Injectable()
export class FCMTokenDao {

    constructor() {
    }

    //Function to store Token on MIDATA
    toFhir(token: FCMToken) {
        /*let userId = this.user.currentUser.id;
        let fhir = {
            id: token.id,
            resourceType: 'Observation',
            subject: {
                reference: 'Patient/' + userId
            },
            effectiveDateTime: moment(token.timestamp).format(),
            code: {
                coding: [{
                    system: this.system,
                    code: this.code,
                    display: 'FCM Token'
                }]
            },
            status: 'final',
            valueString: token.token,
            meta: _.clone(token.meta)
        }
        return fhir;*/
    }

    fromFhir(fhir: any) {
        return new FCMToken({
            id: fhir.id,
            token: fhir.valueString,
            user: fhir.subject.reference.replace(/Patient\//, ''),
            timestamp: moment(fhir.effectiveDateTime).toDate(),
            meta: _.clone(fhir.meta)
        });
    }
}
