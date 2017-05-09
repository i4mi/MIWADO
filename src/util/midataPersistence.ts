import { Midata } from 'midata';
import { Injectable } from '@angular/core';
import * as MidataTypes from './typings/MIDATA_Types';
import * as MiwadoTypes from './typings/MIWADO_Types';

/*----------------------------------------------------------------------------*/
/* MidataPersitence (^.^) (not realy persistence... but almost)
/* isels1
/* This class is meant to be the "LINK" between your code and the midata.js library
/* It should handle all "search queries" and map the result from
   the received JSON into a TypeScript object. It also should convert new
   values from TypeScript objects to the correct JSON object to store on MIDATA.
/* Version 1.0
/*----------------------------------------------------------------------------*/
@Injectable()
export class MidataPersistence {

  private static mp:MidataPersistence;
  private md: any;
  private appname = 'MIWADO';
  private appsecr = 'g82xlcisy4zneu5n9k3dgxgcifr6vfmx';
  private server = 'https://test.midata.coop:9000';
  private role: string;
  private username: string;
  private password: string;
  private authResponse: MidataTypes.MIDATA_authResponse;

  private constructor(){
    this.md = new Midata(this.server, this.appname, this.appsecr);
  }

  /* Public static getInstance()
  * This method gets the instance of the class. If no instance exists,
  * it will create a new one.
  *
  * EXAMPLE:           var mp = MidataPersistence.midataPersistence();
  */
  static getInstance():MidataPersistence {
    if (this.mp == null) {
      this.mp = new MidataPersistence();
    }
    return this.mp;
  }

  /* setRole(r: string)
  * This method sets the role to login.
  * "r" can contain one of the following strings:
  * - "member" (for patients)
  * - "provider" (for healh professionals)
  * - "developer" (for developer)
  * - "research" (for research organisation)
  */
  setRole(r: string) {
    this.role = r;
  }

  /* getRole(): string
  * This method returns the selected role as string.
  * Return value could be one of the following:
  * - "member" (for patients)
  * - "provider" (for healh professionals)
  * - "developer" (for developer)
  * - "research" (for research organisation)
  */
  getRole() : string {
    return this.role;
  }

  /* login(un: string, pw: string)
  * This method logs the user into midata.
  * The following parameters needed to login:
  * - un:   Unsername
  * - pw:   Passwort
  *
  * It is also needed, that the function "setRole"
  * is executed with a valid value BEFORE the login.
  * Local variable used:
  * - this.role:  Role of midata user to login.
  *
  * Returns a promise with the authResponse as value.
  * authResponse contains the following data:
  * - authToken:    Token of the active session
  * - refreshToken: Token needed if site/view get refreshed
  * - status:       Status of the login
  * - owner:        Id of logged in user
  */
  login(un: string, pw: string){
    this.username = un;
    this.password = pw;
    // Casting role from string to UserRole with "<UserRole> role"
    return this.md.login(un, pw , this.role).then(result => {
      console.log("login successful");

      this.authResponse =
      {
        authToken: result.authToken,
        refreshToken: result.refreshToken,
        status: result.status,
        owner: result.owner
      };

      console.log("the result:");
      console.log(result);
      console.log("Bearer " + result.authToken);
      console.log("mapped:");

      return this.authResponse;
    })
  }

  /* loggedIn()
  * This method returns a boolean if the user is
  * logged in or not.
  *
  * Returns true if logged in.
  */
  loggedIn() {
    return this.md.loggedIn;
  }

  /* logout()
  * This method logs the user out from midata.
  */
  logout() {
    this.md.logout();
    console.log("logged out");
  }

  /* getLoggedInId()
  * This method returns the id of the current logged
  * in user.
  *
  * Returns id as string of logged in user.
  */
  getLoggedInId() {
    console.log('logged in id... ' + this.authResponse.owner);
    return this.authResponse.owner;
  }

  /* save(res: any)
  * This method saves the parameter
  * The parameter has to be a fhir resource in json format
  */
  save(res: any) {
    return this.md.save(res);
  }

  /* search(resourceType: string, params?: any)
  * This method searches for a resrouce with a defined type.
  * If the params are defined, it will look up for the resource with the given params
  * --> resourceTyoe:  Can be any 'fhir' resource as a string. Example: "Patient", "Person" or "Observation"
  * --> params:        A JSON object with the given params. Can also be empty "{}"
  *                    Look up for the possible params at http://build.fhir.org/search.html and the specific resource doc
  * IMPORTANT:         This is an asynchronus call. You have to use the '.then(function (response) {})' notation.
  * EXAMPLE:           var mp = MidataPersistence.midataPersistence();
  *                    mp.search("Person", {}).then(function(personList) {
  *                      console.log(personList);
  *                    });
  */
  search(resourceType: string, params?: any) {
    return this.md.search(resourceType, params);
  }

  /* delete(resourceType: string, id: string)
  * This method deletes the resrouce with the defined id.
  * The following parameters needs to be defined for delet a record:
  * - resourceType: Can be any 'fhir' resource as a string. Example: "Patient", "Person" or "Observation"
  * - id:           The id of the object to delete
  *
  * IMPORTANT:      DO NOT USE THIS METHOD. MIDATA IS STILL NOT READY TO DELETE RECORDS.
  *                 IF YOU STILL TRY IT, IT WILL END IN A CATASTROPH! (-.-)
  */
  delete(resourceType: string, id: string) {
    return this.md.delete(resourceType, id);
  }

  /* retreiveCommRes(pat: MiwadoTypes.MIWADO_Patient, params?: any)
  * This method searches and returns the saved fhir communication resoruce on midata.
  * The following parameters are needed:
  * - pat:      Patient object to retreive the resources from.
  *             The id of the patient is used to look up the subject of the communication resource.
  * - params?:  any additional search parameters (*not implemented jet)
  *
  * Returns a promise with an array of all fhir communication resources found.
  * communication resource contains the following data:
  * - identifier:        The unique id of the record
  * - status:            The statues of the record. While messeging this will always be "in-progress"
  * - category:          The category of the record as codable concept.
  * - medium:            The medium contains array of the sending "medium" app name
  * - subject:           The Subject always referes to the patient the communication is with!
  * - recipient:         Recipient contains an array of all recipient. Mostly a group and a patient.
  * - sent:              The date when sent
  * - received:          The date time when received. (not set until now!)
  * - sender:            Sender of the resource. Mostly a reference to a patient or a health profesisonal
  * - payload:           The content of the message. Can contains a array of one the following three "contents":
  *                      -  contentString:      Content is a simple string message.
  *                      -  contentAttachment:  Content is a attachement file. Something like pdf or img
  *                      -  contentReference:   Content is a reference to any other resource on midata.
  * - encounter:         Not used
  * - reason:            Array of reasons while msg was sent (not used)
  * - requestDetail:     Details of the request (not used)
  * - ownership:         Ownership not part of original resource. This will always be empty when received from midata.
  */
  retreiveCommRes(pat: MiwadoTypes.MIWADO_Patient, params?: any){
    return this.search('Communication', { "patient": pat.id }).then((result) => {
      //console.log("resources" + JSON.stringify(result));
      //console.log("breakpoint goes here");
      var commRes = new Array<MidataTypes.MIDATA_HL7CommRes>();
      for(var i = 0; i < result.length; i++)
      {
        //console.log('loop round ' + i + ' to convert');
        var asd = this.convertCommResToTS(result[i]);
        //console.log('converted it to: ' + asd);
        commRes.push(asd);
      }
      return commRes;
    });
  }

  /* retreivePatients()
  * This method searches and returns all patients that have consents with
  * the logged in user or a group the logged in user is a member of.
  *
  * Returns a promise with an array of all patients found.
  * Patient resource contains the following data:
  * - id:             Id of the patient resource
  * - displayName:    Display Name (Firstname and surename of patient)
  * - fcmToken?:      FMC Token object (maybe? - not used)
  * - commThreadId?:  Internal id of communication thread... (not part of original resource and not used here)
  * - gender:         Gender of the patient
  * - icon?:          Icon is not part of the original resource. The icon will be set according the gender.
  */
  retreivePatients(){
    //normally a search query callback: any
    return this.search('Patient').then((result) => {
      var patList = new Array<MiwadoTypes.MIWADO_Patient>();
      for(var i = 0; i < result.length; i++)
      {
        //console.log('loop round ' + i + ' to convert');
        var asd = this.convertPatToTS(result[i]);
        //console.log('converted it to: ' + asd);
        patList.push(asd);
      }
      return patList;
    });
  }

  /* retreiveFCMToken()
  * This method searches and returns all device recource (for FCM Token) a patient has.
  * Ether way, if own resource or if part of a patient with a consent.
  * A FCM Token is used for notifications. Therefore you will need an additional service called
  * FIREBASE CLOUD MESSAGIN!
  *
  * Returns a promise with an array of device resource found.
  * Device resource contains the following data:
  * - id:             Id of the device resource
  * - lotNumber:      The lotNumber is used to store the FCM Token
  * - type:           Codable consept of a type. Should be "FCMToken" to distiguish from other device resources.
  * - status:         The status will be active.
  * - manufacturer:   Manufacturer is used to set the user the token is for.
  */
  retreiveFCMToken(){
    return this.search('Device').then((result) => {
      console.log('token resources:');
      console.log(result);
      return result;
    }).catch((error) => {
        console.error('Error fetching users', error);
    });
  }

  /* deleteFCMToken(id: string)
  * This method deletes the resrouce with the defined id.
  * The following parameters needs to be defined for delet a record:
  * - id:           The id of the device reource to delete
  *
  * IMPORTANT:      DO NOT USE THIS METHOD. MIDATA IS STILL NOT READY TO DELETE RECORDS.
  *                 IF YOU STILL TRY IT, IT WILL END IN A CATASTROPH! (-.-)
  */
  deleteFCMToken(id: string) {
    return this.delete('Device', id).then((result) => {
      console.log('deleted token resource:');
      console.log(result);
      return result;
    }).catch((error) => {
        console.error('Error fetching users', error);
    });
  }

  // Private helper to convert a HL7 FHIR Patient
  // Object JSON into the MiwadoTypes.MIWADO_Patient.
  // -->  return: TS (MiwadoTypes.MIWADO_Patient)
  private convertPatToTS(JSON): MiwadoTypes.MIWADO_Patient {
    var TS:MiwadoTypes.MIWADO_Patient;

    //console.log('beginn with convert JSON to TS...');
    //console.log('JSON is: ' + JSON);
    var displayName = '';

    for(var i = 0; i < JSON.name.length; i++){
      displayName += JSON.name[i].family + " ";
      displayName += JSON.name[i].given[0];
    }

    TS = {
      id: JSON.id,
      displayName: displayName,
      gender: JSON.gender,
      icon: 'none',
    } as MiwadoTypes.MIWADO_Patient;

    if (JSON.gender == 'male') {
      TS.icon = './assets/img/pat-m-w.png';
    } else if (JSON.gender == 'female') {
      TS.icon = './assets/img/pat-f-b.png';
    } else {
      TS.icon = './assets/img/pat-m-b.png';
    }

    return TS;
  }

  // Private helper to convert a HL7 Communication resource JSON
  // into the MIDATA_Types.MIDATA_HL7CommRes.
  // -->  return: MIDATA_Types.MIDATA_HL7CommRes Object
  private convertCommResToTS(JSON){
    //console.log(JSON);
    var TS:MidataTypes.MIDATA_HL7CommRes;
    var s:MidataTypes.MIDATA_HL7CommRes_Person;

    TS = {
      resourceType: '',
      category: '',
      sender: s,
      status: '',
      recipient: [],
      payload: [],
      medium: [],
      encounter: '',
      sent: new Date(),
      received: new Date(),
      reason: [],
      subject: s,
      requestDetail: '',
      ownership:'',
      messageDisplay: ''
    };

    TS.resourceType = JSON.resourceType;
    TS.category = JSON.category;

    s = {
      reference: '',
      display: ''
    }
    s.reference = JSON.sender.reference;
    s.display = JSON.sender.display;
    TS.sender = s;
    TS.status = JSON.status;

    // Convert all "recipients"
    for (var i = 0; i < JSON.recipient.length; i++) {
      var r:MidataTypes.MIDATA_HL7CommRes_Person;
      r = {
        reference: '',
        display: ''
      }
      r.reference = JSON.recipient[i].reference;
      TS.recipient.push(r);
    }

    // Checks if:
    // -->  contentString
    // -->  contentAttachment
    // -->  contentRefernce
    if(JSON.payload != undefined) {
      for (var i = 0; i < JSON.payload.length; i++) {
        if (JSON.payload[i].hasOwnProperty('contentString')) {
          var cS:MidataTypes.MIDATA_HL7CommRes_Payload_String;
          cS = { contentString: '' }
          cS = JSON.payload[i].contentString;
          TS.payload.push(cS);
        } else if (JSON.payload[i].hasOwnProperty('contentAttachment')) {
          var cA:MidataTypes.MIDATA_HL7CommRes_Payload_Attachment;
          cA = { contentAttachment: '' }
          cA = JSON.payload[i].contentAttachment;
          TS.payload.push(cA);
        } else if (JSON.payload[i].hasOwnProperty('contentRefernce')) {
          var cR:MidataTypes.MIDATA_HL7CommRes_Payload_Refernce;
          cR = { contentRefernce: '' }
          cR = JSON.payload[i].contentRefernce;
          TS.payload.push(cR);
        }
      }
    } else {
      cS = { contentString: '' }
      TS.payload.push(cS);
    }

    if(JSON.medium) {
      // Converts medium to MIDATA_HL7CommRes_Medium
      for (var i = 0; i < JSON.medium.length; i++) {
        var m:MidataTypes.MIDATA_HL7CommRes_Medium;
        m = {
          type: '',
          name: ''
        }
        m.type = JSON.medium[i].type;
        m.name = JSON.medium[i].name;
        TS.medium.push(m);
      }
    }

    TS.encounter = JSON.encounter;
    TS.sent = new Date(JSON.sent);
    TS.received = new Date(JSON.received); // ToDO: on first receive set new date!
    TS.reason.push(JSON.reason);
    TS.subject = JSON.subject;
    TS.requestDetail = JSON.requestDetail;

    return TS;
  }

  // Private helper to convert a MIDATA_Types.MIDATA_HL7CommRes
  // Object into the HL7 Communication resource.
  // -->  return: JSON (HL7 Communication resource)
  private convertComResToJSON(TS) {
    // Prepare recipients
    var recipients:Array<any>;
    for(var i = 0; i < TS.recipient.length; i++)
    {
      var pers = {
        "reference": TS.recipient[i].reference,
        "display": TS.recipient[i].display
      }
      recipients.push(pers);
    }

    // Prepare payload
    var payload:Array<any>;
    for(var i = 0; i < TS.payload.length; i++) {
      if (this.instanceofContentString(TS.payload[i])) {
        var cS = {
          "contentString": TS.payload[i]
        }
        payload.push(cS);
      } else if (this.instanceofContentAttachment(TS.payload[i])) {
        var cA = {
          "contentAttachment": TS.payload[i]
        }
        payload.push(cA);
      } else if (this.instanceofContentReference(TS.payload[i])) {
        var cR = {
          "contentReference": TS.payload[i]
        }
        payload.push(cR);
      }
    }

    // Prepare medium
    var medium:Array<any>
    for (var i = 0; i < TS.medium.length; i++) {
      var m = {
        type: TS.medium[i].type,
        name: TS.medium[i].name
      }
      medium.push(m);
    }

    // Prepare reason
    var reason:Array<any>;
    reason.push(TS.reason);

    // Put the json together
    var JSON = {
      "resourceType":   TS.resourceType,
      "category":       TS.category,
      "sender":         TS.sender,
      "status":         TS.status,
      "recipient":      recipients,
      "payload":        payload,
      "medium":         medium,
      "encounter":      TS.encounter,
      "sent":           TS.sent,
      "received":       TS.received, //ToDo: set received time on first "get"
      "reason":         reason,
      "subject":        TS.subject,
      "requestDetail":  TS.requestDetail
    }

    return JSON;
  }

  // Private helper to check if object (TS CommRes)
  // is MidataTypes.MIDATA_HL7CommRes_Payload_String
  private instanceofContentString(object: any): object is MidataTypes.MIDATA_HL7CommRes_Payload_String {
    return true;
  }

  // Private helper to check if object (TS CommRes)
  // is MidataTypes.MIDATA_HL7CommRes_Payload_Attachment
  private instanceofContentAttachment(object: any): object is MidataTypes.MIDATA_HL7CommRes_Payload_Attachment {
    return true;
  }

  // Private helper to check if object (TS CommRes)
  // is MidataTypes.MIDATA_HL7CommRes_Payload_Refernce
  private instanceofContentReference(object: any): object is MidataTypes.MIDATA_HL7CommRes_Payload_Refernce {
    return true;
  }
}
