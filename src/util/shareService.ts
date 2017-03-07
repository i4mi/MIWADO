export class ShareService {

    displayName: string;
    gender: string;
    role : string;

    constructor() {

    }

    setPatient(displayName, gender) {
        this.displayName = displayName;
        this.gender = gender;
    }

    setRole(role){
      this.role = role;
    }

    getRole(){
      return this.role
    }

    getPatientDisplayname() {
        return this.displayName;
    }

    getPatientGender() {
        return this.gender;
    }
}
