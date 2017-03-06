import * as MidataTypes from './MIDATA_Types';

export interface MIWADO_Person {
  id:string;
  displayName:string;
  fcmToken:string;
}

export interface MIWADO_HP extends MIWADO_Person {
  groupId:string;
  patientList:Array<MIWADO_Patient>;
}

export interface MIWADO_Patient extends MIWADO_Person {
  commThreadId:string;
  gender:string;
  icon:string;
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
