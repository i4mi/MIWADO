import * as MidataTypes from './MIDATA_Types';

export interface MIWADO_Person {
  id:string;
  displayName:string;
  fcmToken?:string;
}

export interface MIWADO_HP extends MIWADO_Person {
  groupId:string;
  patientList:Array<MIWADO_Patient>;
}

export interface MIWADO_Patient extends MIWADO_Person {
  commThreadId?:string;
  gender:string;
  icon?:string;
}

export interface MIWADO_User {
  //type:MIWADO_HP|MIWADO_Patient;
  username:string;
  password:string;
  auth?:MidataTypes.MIDATA_authResponse;
  messageList?:Array<MIWADO_Message>;
}

export interface MIWADO_Message {
  //Maybe delete?
  senderId:string;
  sender:string;
  content:any;
  time:Date;
}

export interface FCMToken_Device {
  resourceType: string;
  lotNumber: string;
  type: string;
  status: string;
  manufacturer: string;
}

/**
 *  Structure of a notification after all the decryption and unwrapping
 *  has been done.
 */
export interface Notification {
    title: string;
    type: string;
    payload?: any;
}


/** Structure of a notification payload sent via FCM */
export interface FCMNotificationData {
    // The encrypted inner payload. A stringified and encrypted object
    // of type `Notification`.
    secure?: string;
    // If the notification was tapped in the
    // OS' notification center.
    wasTapped?: boolean;
}
