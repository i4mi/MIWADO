export class ShareService {

    displayName: string;
    gender: string;
    role : string;
    senderName : string;
    senderPatientName : string;
    fastingStatus : string;

    constructor() {

    }
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
