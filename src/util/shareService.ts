/*
* Class ShareService
* This class is used to handle the data
* exchange between the views, without
* saving the values in the storage.
*
* The data to exchange are:
* - displayName
* - gender
* - role
* - senderName
* - senderPatientName
* - fastingStatus
*
* Version:    1.0 Test Version
* Author(s):  isels1, zyssm4
* Date:       Builded 15.06.2017
*/
export class ShareService {

    displayName: string;
    gender: string;
    role : string;
    senderName : string;
    senderPatientName : string;
    fastingStatus : string;

    constructor() {}


    setFastingStatus(status){
      this.fastingStatus = status;
    }

    getFastingStatus(){
      return this.fastingStatus;
    }

    setPatient(displayName, gender) {
        this.displayName = displayName;
        this.gender = gender;
    }

    setSenderPatient(firstName, lastName){
      this.senderPatientName = firstName + " " + lastName;
    }
    setSender(sendername){
      this.senderName = sendername;
    }

    setRole(role){
      this.role = role;
    }

    getRole(){
      return this.role
    }

    getSenderName(){
      return this.senderName;
    }

    getPatientDisplayname() {
        return this.displayName;
    }

    getSenderPatient(){
      return this.senderPatientName
    }

    getPatientGender() {
        return this.gender;
    }
}
