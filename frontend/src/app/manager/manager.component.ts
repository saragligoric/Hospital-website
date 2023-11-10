import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../session-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';
import { Doctor } from '../model/doctor';
import { DoctorsService } from '../doctors.service';
import { Patient } from '../model/patient';
import { PatientsService } from '../patients.service';
import { ExaminationsService } from '../examinations.service';
import { SpecializationsService } from '../specializations.service';
import { ExaminationRequest } from '../model/examinationsRequests';
import { Examination } from '../model/examinations';
import { Registration } from '../model/registration';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})

export class ManagerComponent implements OnInit {
  message: string;
  message1: string;
  oldpass: string;
  newpass: string;
  confirmnewpass: string;

  specStringsSet: Set<String>;

  constructor(private userService: UserService, private examinationsService: ExaminationsService, private specizalizationService: SpecializationsService, private patientsService: PatientsService, private router:Router, private sessionStorageService: SessionStorageService, private doctorsService: DoctorsService, private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.doctorsService.getAllDoctors().subscribe((data: Doctor[])=>{
      this.allDoctors = data;
    })
    this.patientsService.getAllPatients().subscribe((data: Patient[])=>{
      this.allPatients = data;
    })
    this.examinationsService.getAllRequests().subscribe((data: ExaminationRequest[])=>{
      this.allRequests = data;
    })
    this.examinationsService.getAllExaminations().subscribe((data: Examination[])=>{
      this.allExaminations = data;
      this.specStringsSet = this.createUniqueStringSet(this.allExaminations, 'specialization');
    })
    this.registrationService.getAllRegistrations().subscribe((data: Registration[])=>{
      this.allRegistrations = data;
    })
  }

  createUniqueStringSet(arrayOfObjects: any[], fieldName: string): Set<string> {
    const stringSet = new Set<string>();
  
    // Iterate through the array of objects and add the field to the set
    for (const obj of arrayOfObjects) {
      if (obj[fieldName]) {
        stringSet.add(obj[fieldName]);
      }
    }
  
    return stringSet;
  }

  deleteExamination(examination){
    this.examinationsService.deleteExamination(examination.specialization, examination.title, examination.duration, examination.price).subscribe(resp=>{
      this.examinationsService.getAllExaminations().subscribe((data: Examination[])=>{
        this.allExaminations = data;
      })
      this.router.navigate(['manager']);
    })
  }

  approve(request){
    this.examinationsService.approveRequest(request.specialization, request.title, request.duration, request.price).subscribe(resp=>{
      this.message1="Examination added to system"
      this.examinationsService.getAllRequests().subscribe((data: ExaminationRequest[])=>{
        this.allRequests = data;
      })
      this.router.navigate(['manager']);
    })
  }

  deny(request){
    this.examinationsService.denyRequest(request.specialization, request.title, request.duration, request.price).subscribe(resp=>{
      this.examinationsService.getAllRequests().subscribe((data: ExaminationRequest[])=>{
        this.allRequests = data;
      })
      this.router.navigate(['manager']);
    })
  }

  allDoctors: Doctor[] = []
  allPatients: Patient[] = []
  allExaminations: Examination[] = []
  allRequests: ExaminationRequest[] = []

  onSubmit() {

    if (!this.isPasswordValid(this.newpass)) {
      this.message = "New password must have a minimum of 8 characters, maximum of 14 characters, at least one uppercase letter, at least one number, at least one special character, must begin with a lowercase letter and no adjacent two characters can be the same"
    } else if (this.newpass === this.confirmnewpass) {
      this.userService.getOldPassword(this.oldpass).subscribe((userFromDB: User)=>{
        if(userFromDB!=null){
          this.update(); 
          this.logout();
        }
        else{
          this.message="Old password must match"
        }
      })
    } else {
      this.message="New password and confirmation of new password must match"
    }
  }

  isPasswordValid(password: string): boolean {
    const regex: RegExp = /^(?!.*(.)\1)(?=[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,14}$/;
    const isValid = regex.test(password);
    return isValid;
  }

  update(){
    const data = this.sessionStorageService.getItem('user');
    const username = data.username;
    this.userService.updatePassword(username, this.newpass).subscribe(resp=>{
      alert(resp['message'])
    })
  }

  logout(){
    this.userService.setIsAuthenticated(false);
    this.sessionStorageService.removeItem('user');
    this.router.navigate(['/']);
  }

  deleteDoctor(doctor: Doctor){
    this.doctorsService.deleteDoctor(doctor).subscribe(resp=>{
      alert(resp['message'])
      this.doctorsService.getAllDoctors().subscribe((data: Doctor[])=>{
        this.allDoctors = data;
      })
    })
  }

  deletePatient(patient: Patient){
    this.patientsService.deletePatient(patient).subscribe(resp=>{
      alert(resp['message'])
      this.patientsService.getAllPatients().subscribe((data: Patient[])=>{
        this.allPatients = data;
      })
    })
  }

  regusername: String;
  regpassword: string;
  regfirstname: String;
  reglastname: String;
  regphone: String;
  regemail: String;
  regspec: String;
  regbranch: String;
  reglicence: String;
  regaddress: String;

  regtype: number = 1;
  regimageurl: String = "https://i.imgur.com/5OUG6yf.jpg"


  addDoctor(){
    if (!this.regusername || !this.regpassword || !this.regfirstname || !this.reglastname || !this.regphone || !this.regemail
        || !this.regspec || !this.regbranch || !this.reglicence || !this.regaddress){
          this.message1 = "All fields must be filled"
          return 
        }

    const isContained = this.specStringsSet.has(this.regspec);
    if (!isContained){
      this.message1 = "Can't add a doctor with a specialization that doesn't exist"
      return
    }
    if (!this.isPasswordValid(this.regpassword)){
      this.message1 = "Password must have a minimum of 8 characters, maximum of 14 characters, at least one uppercase letter, at least one number, at least one special character, must begin with a lowercase letter and no adjacent two characters can be the same"
      return
    }

    this.doctorsService.addDoctor(this.regusername, this.regpassword, this.regfirstname, this.reglastname, this.regphone, this.regemail, this.regspec, this.regbranch, this.reglicence, this.regaddress, this.regtype, this.regimageurl).subscribe(resp=>{
      this.message1="Doctor added to system"
      this.regusername='';
      this.regpassword='';
      this.regfirstname='';
      this.reglastname='';
      this.regphone='';
      this.regemail='';
      this.regspec='';
      this.regbranch='';
      this.reglicence='';
      this.regaddress='';
      this.doctorsService.getAllDoctors().subscribe((data: Doctor[])=>{
        this.allDoctors = data;
      })
      this.router.navigate(['manager']);
    })
  }

  spectitle: String;
  message2: String;

  addSpec(){
    this.specizalizationService.addSpec(this.spectitle).subscribe(resp=>{
      this.message2="Specialization added to system";
    })
    this.router.navigate(['manager']);
  }

  examspec: String;
  examtitle: String;
  examduration: string;
  examprice: String;
  message3: String;

  addExamination(){
    const isContained = this.specStringsSet.has(this.examspec);
    if (!isContained){
      this.message3 = "Specialization doesn't exist"
      return
    }
    var isValidFormat
    const pattern = /^[0-9]+m$/;
    isValidFormat = pattern.test(this.examduration);
    if (!isValidFormat){
      this.message3 = "Duration must be in format Xm where X represents a number"
      return
    }

    this.examinationsService.addExamination(this.examspec, this.examtitle, this.examduration, this.examprice).subscribe(resp=>{
      this.message3="Examination added to system";
    })
    this.router.navigate(['manager']);
  }

  allRegistrations: Registration[] = []
  message4: String;

  acceptRequest(registration){
    this.registrationService.accept(registration).subscribe(resp=>{
      this.message4="Registration request accepted";
    })

    this.registrationService.getAllRegistrations().subscribe((data: Registration[])=>{
      this.allRegistrations = data;
      this.router.navigate(['manager']);
    })
  }

  rejectRequest(registration){
    this.registrationService.reject(registration).subscribe(resp=>{
      this.message4="Registration request rejected";
    })

    this.registrationService.getAllRegistrations().subscribe((data: Registration[])=>{
      this.allRegistrations = data;
      this.router.navigate(['manager']);
    })
  }

  editItem(index: number) {
    this.allExaminations[index].isEditing = true;
  }

  newDuration: String = '30m';
  newPrice: String

  saveItem(index: number) {
    this.allExaminations[index].isEditing = false;
    // You can also update data on the server here if needed
    this.examinationsService.updateExamination(this.allExaminations[index], this.newDuration,this.newPrice).subscribe(resp=>{
      this.examinationsService.getAllExaminations().subscribe((data: Examination[])=>{
        this.allExaminations = data;
      })
    })
  }

  cancelEdit(index: number) {
    this.allExaminations[index].isEditing = false;
    this.examinationsService.getAllExaminations().subscribe((data: Examination[])=>{
      this.allExaminations = data;
    })
  }

  editItemDoctor(index: number) {
    this.allDoctors[index].isEditing = true;
  }

  saveItemDoctor(index: number) {
    this.allDoctors[index].isEditing = false;
    // You can also update data on the server here if needed
    this.doctorsService.updateDoctor(this.allDoctors[index]).subscribe(resp=>{
      this.doctorsService.getAllDoctors().subscribe((data: Doctor[])=>{
        this.allDoctors = data;
      })
    })

    //update i u tabeli usera: treba prvo da dovuces User: user iz tabele usera koji ima ovaj username lekara
    const username = this.allDoctors[index].username;
    this.userService.getUser(username).subscribe((data: User)=>{
      this.userService.updateUser(data, this.allDoctors[index]).subscribe(resp=>{
        
      })
    })
  }

  cancelEditDoctor(index: number) {
    this.allDoctors[index].isEditing = false;
    this.doctorsService.getAllDoctors().subscribe((data: Doctor[])=>{
      this.allDoctors = data;
    })
  }

  editItemPatient(index: number) {
    this.allPatients[index].isEditing = true;
  }

  saveItemPatient(index: number) {
    this.allPatients[index].isEditing = false;
    // You can also update data on the server here if needed
    this.patientsService.updatePatient(this.allPatients[index]).subscribe(resp=>{
      this.patientsService.getAllPatients().subscribe((data: Patient[])=>{
        this.allPatients = data;
      })
    })

    //update i u tabeli usera: treba prvo da dovuces User: user iz tabele usera koji ima ovaj username lekara
    const username = this.allPatients[index].username;
    this.userService.getUser(username).subscribe((data: User)=>{
      this.userService.updateUser(data, this.allPatients[index]).subscribe(resp=>{
        
      })
    })
  }

  cancelEditPatient(index: number) {
    this.allPatients[index].isEditing = false;
    this.patientsService.getAllPatients().subscribe((data: Patient[])=>{
      this.allPatients = data;
    })
  }



}
