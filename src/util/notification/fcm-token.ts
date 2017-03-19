import * as moment from 'moment';
import * as _ from 'lodash';


export interface FCMTokenOpt {
    id?: string;
    token: string;
    user: string;
    timestamp?: Date;
    meta?: any;
}

/**
 * Wrapper around the FCM tokens received from the FCM service.
 * Objects of this class are stored on MIDATA as simple observations
 * that are shared between all users of one Karegenda session.
 */
export class FCMToken {
    id: string;
    token: string;
    user: string;
    timestamp: Date;
    meta: any;

    constructor(opt: FCMTokenOpt) {
        this.id = opt.id;
        this.token = opt.token;
        this.user = opt.user;
        this.meta = _.clone(opt.meta);
        this.timestamp = opt.timestamp ? opt.timestamp : moment().toDate()
    }

    /**
     * Return a FCMToken instance with a new token.
     * @param token
     * @returns {FCMToken}
     */
    withToken(token: string) {
        return new FCMToken({
            id: this.id,
            token: token,
            user: this.user,
            timestamp: this.timestamp,
            meta: _.clone(this.meta)
        });
    }
}
