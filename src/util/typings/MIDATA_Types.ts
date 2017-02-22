//MIDATA_Types from mko1:
// - MIDATA_request
// - DateToValue
// - MIDATA_properties
// - MIDATA_authResponse
// - MIDATA_Triplet
export interface MIDATA_request
 {
     authToken: string;
     fields: string[];
     properties: MIDATA_properties;

 }

export interface DateToValue
{
    [date: string]: number;
}



 export interface MIDATA_properties
 {
     owner: string;
     format?: string;
     content?: string;
     data?: any;
     index?: any;
 }

 export interface MIDATA_authResponse
 {
     authToken: string;
     refreshToken: string;
     status: string;
     owner: string;
 }

 export interface MIDATA_Triplet
 {
     date: string;
     value: number;
     unit: string;
 }

 export interface MIDATA_HL7CommRes {
   resourceType:string;

   category:string;
   sender:MIDATA_HL7CommRes_Person;
   status:string;
   recipient:Array<MIDATA_HL7CommRes_Person>;
   payload:Array<MIDATA_HL7CommRes_Payload_String|MIDATA_HL7CommRes_Payload_Attachment|MIDATA_HL7CommRes_Payload_Refernce>;
   medium:Array<MIDATA_HL7CommRes_Medium>;
   encounter:any;
   sent:Date;
   received:Date;
   reason:Array<any>;
   subject:string;
   requestDetail:any;
 }

 export interface MIDATA_HL7CommRes_Person {
   reference:string;
   display:string;
 }

 export interface MIDATA_HL7CommRes_Payload_String {
   contentString:string;
 }

 export interface MIDATA_HL7CommRes_Payload_Attachment {
   contentAttachment:any;
 }

 export interface MIDATA_HL7CommRes_Payload_Refernce {
   contentRefernce:string;
 }

export interface MIDATA_HL7CommRes_Medium {
  type:string;
  name:string;
}
