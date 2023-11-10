import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../session-storage.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Examination } from '../model/examinations';
import { ExaminationsService } from '../examinations.service';
import { DoctorsService } from '../doctors.service';
import { DoctorExam } from '../model/doctorexams';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  message: string;
  oldpass: string;
  newpass: string;
  confirmnewpass: string;

  allExaminations: Examination[] = []
  filteredExaminations: Examination[] = []
  doctor: User;
  doctorExams: DoctorExam[] = []
  titlesStringsSet: Set<String>;

  constructor(private userService: UserService, private doctorsService: DoctorsService, private examinationsService: ExaminationsService, private router:Router, private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    const data = this.sessionStorageService.getItem('user');
    this.firstname=data.firstname;
    this.lastname=data.lastname;
    this.username=data.username;
    this.password=data.password;
    this.type=data.type;
    this.address = data.address;
    this.phone=data.phone;
    this.email= data.email;
    this.imageurl= data.imageurl;
    this.branch=data.branch;
    this.licence=data.licence;
    this.specialization=data.specialization;

    const data2 = this.sessionStorageService.getItem('user');
    const spec = data2.specialization;
    this.examinationsService.getAllExaminationsForSpec(spec).subscribe((dataaa:Examination[])=>{
      this.allExaminations = dataaa;
    })

    this.userService.getUser(this.username).subscribe((data: User)=>{
      this.doctor = data;

      this.doctorExams=this.doctor.doctorExams;
      this.filteredExaminations = this.allExaminations.filter(obj =>
        this.doctorExams.some(filterItem => filterItem.text === obj.title)
      );
      this.titlesStringsSet = this.createUniqueStringSet(this.filteredExaminations, 'title');
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

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  type: number;
  address: string;
  phone: string;
  email: string;
  imageurl: string;
  branch:string;
  licence:string;
  specialization: string;

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
    })
    this.userService.updatePasswordDoctors(username, this.newpass).subscribe(resp=>{
      alert(resp['message'])
    })
  }

  logout(){
    this.userService.setIsAuthenticated(false);
    this.sessionStorageService.removeItem('user');
    this.router.navigate(['/']);
  }

  title: String
  message1: String;
  message2: String;

  addExamination(){    
    const isContained = this.titlesStringsSet.has(this.title);
    if (isContained){
      this.message1 = "Already doing selected examination"
      return
    }
    const data = this.sessionStorageService.getItem('user');
    const username = data.username;
    this.doctorsService.addExamination(username, this.title).subscribe(resp=>{
      this.message1 = "Examination added to your profile"
      this.message2 = ""
      this.userService.getUser(this.username).subscribe((data: User)=>{
        this.doctor = data;

        this.doctorExams=this.doctor.doctorExams;
        this.filteredExaminations = this.allExaminations.filter(obj =>
          this.doctorExams.some(filterItem => filterItem.text === obj.title)
        );
      })
      this.router.navigate(['doctor']);
    })
  }

  removeExamination(){    
    const isContained = this.titlesStringsSet.has(this.title);
    if (!isContained){
      this.message1 = "Selected examination is not being done"
      return
    }
    const data = this.sessionStorageService.getItem('user');
    const username = data.username;
    this.doctorsService.removeExamination(username, this.title).subscribe(resp=>{
      this.message1 = ""
      this.message2 = "Examination removed from your profile"
      this.userService.getUser(this.username).subscribe((data: User)=>{
        this.doctor = data;

        this.doctorExams=this.doctor.doctorExams;
        this.filteredExaminations = this.allExaminations.filter(obj =>
          this.doctorExams.some(filterItem => filterItem.text === obj.title)
        );
      })
      this.router.navigate(['doctor']);
    })
  }
}
