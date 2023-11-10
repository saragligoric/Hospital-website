import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../session-storage.service';
import { User } from '../model/user';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  message: string;
  oldpass: string;
  newpass: string;
  confirmnewpass: string;

  constructor(private sessionStorageService: SessionStorageService, private userService: UserService, private router:Router) { }

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

    this.newfirstname = this.firstname;
    this.newlastname = this.lastname;
    this.newphone = this.phone;
    this.newaddress = this.address;
    this.newemail = this.email;
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

  isEditing: boolean = false;
  editPatient(){
    this.isEditing=true;
  }

  newfirstname: string;
  newlastname: string;
  newaddress: string;
  newemail: string;
  newphone: string;

  saveItem() {
    const data = this.sessionStorageService.getItem('user');
    const username = data.username;
    this.isEditing = false
    this.userService.editUser(username, this.newfirstname, this.newlastname, this.newaddress, this.newemail, this.newphone).subscribe(resp=>{
      this.firstname=this.newfirstname;
      this.lastname = this.newlastname;
      this.address = this.newaddress;
      this.email = this.newemail;
      this.phone = this.newphone

      this.sessionStorageService.removeItem('user')
      this.sessionStorageService.setItem('user', { firstname: this.newfirstname, lastname: this.newlastname,  username: this.username, password: this.password, type: this.type, address: this.newaddress, phone: this.newphone, email: this.newemail, imageurl: this.imageurl });
    })
  }

  cancelEdit() {
    this.isEditing = false
    this.newfirstname = this.firstname;
    this.newlastname = this.lastname;
    this.newphone = this.phone;
    this.newaddress = this.address;
    this.newemail = this.email;
  }
}
