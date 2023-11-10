import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Doctor } from '../model/doctor';
import { DoctorsService } from '../doctors.service';
import { SessionStorageService } from '../session-storage.service';
import { User } from '../model/user';
import { Rejected } from '../model/rejected';

@Component({
  selector: 'app-loglogin',
  templateUrl: './loglogin.component.html',
  styleUrls: ['./loglogin.component.css']
})
export class LogloginComponent implements OnInit {

  constructor(private registrationService: RegistrationService, private userService: UserService, private router:Router, private doctorsService: DoctorsService, private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    this.doctorsService.getAllDoctors().subscribe((data: Doctor[])=>{
      this.allDoctors = data;
    })
    this.image='../../assets/images/profilepic.jpg';
  }

  allDoctors: Doctor[] = []
  someText: string = "Welcome to our state-of-the-art medical institution dedicated to providing exceptional healthcare and compassionate healing. At Franklin Square Hospital Center, we pride ourselves on our commitment to delivering world-class medical services in a nurturing and technologically advanced environment. Our hospital boasts a team of highly skilled medical professionals who are at the forefront of their respective fields. With a comprehensive range of specialties and cutting-edge medical equipment, we are equipped to address a diverse array of health concerns, from routine check-ups to complex surgical procedures.Patient well-being is at the heart of everything we do. Our patient-centered approach ensures that each individual receives personalized care tailored to their unique needs. We understand that navigating health challenges can be daunting, so we strive to create a warm and welcoming atmosphere for our patients and their families.Conveniently located, our facility is designed for both comfort and efficiency. From spacious and modern patient rooms to advanced diagnostic and treatment facilities, every aspect of our hospital is geared towards enhancing the patient experience.At Franklin Square Hospital Center, we are dedicated to not only treating illnesses but also promoting wellness and preventive care within our community. Through education, outreach programs, and a commitment to innovation, we aim to empower individuals to take control of their health and lead fulfilling lives. Discover comprehensive healthcare with a human touch at Franklin Square Hospital Center. Your well-being is our priority, and we are honored to be your partner on your journey to better health.";

  ascending = true;
  currentSortColumn = 'firstname';

  sort(column: string){
    if (this.currentSortColumn === column) {
      this.ascending = !this.ascending;
    } else {
      this.currentSortColumn = column;
      this.ascending = true;
    }

    this.allDoctors.sort((a, b) => {
      const comparison = a[column].localeCompare(b[column]);
      return this.ascending ? comparison : -comparison;
    });
  }

  username: string;
  password: string;
  message: string;
  message2: String;

  images=[
    {
      imageSrc: '../assets/images/image1.jpg',
      imageAlt: 'image1'
    },
    {
      imageSrc: '../assets/images/image2.jpeg',
      imageAlt: 'image2'
    },
    {
      imageSrc: '../assets/images/image3.jpg',
      imageAlt: 'image3'
    },
    {
      imageSrc: '../assets/images/image4.jpg',
      imageAlt: 'image4'
    },
    {
      imageSrc: '../assets/images/image5.jpg',
      imageAlt: 'image5'
    }
  ]

  login(){
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
      if(userFromDB!=null){
        if(userFromDB.type==0){
          this.userService.setIsAuthenticated(true);
          this.sessionStorageService.setItem('user', { firstname: userFromDB.firstname, lastname: userFromDB.lastname,  username: userFromDB.username, password: userFromDB.password, type: userFromDB.type, address: userFromDB.address, phone: userFromDB.phone, email: userFromDB.email, imageurl: userFromDB.imageurl });
          this.router.navigate(['patient']);
        }
        else if (userFromDB.type==1){
          this.userService.setIsAuthenticated(true);
          this.sessionStorageService.setItem('user', { firstname: userFromDB.firstname, lastname: userFromDB.lastname,  username: userFromDB.username, password: userFromDB.password, type: userFromDB.type, address: userFromDB.address, phone: userFromDB.phone, email: userFromDB.email, imageurl: userFromDB.imageurl, branch: userFromDB.branch, licence: userFromDB.licence, specialization: userFromDB.specialization});
          this.router.navigate(['doctor']);
        }
        else if (userFromDB.type==2){
          this.message="Manager cannot login from this form"
        }
      }
      else{
        this.message="Wrong username or password"
      }
    })
  } 

  navigate(){
    this.router.navigate(['loginmanager']);
  }

  searchParamName: string;
  searchParamSurname: string;
  searchParamSpec: string;

  search(){
    this.doctorsService.getAllDoctors().subscribe((data: Doctor[])=>{
      this.allDoctors = data;

      if (this.searchParamName || this.searchParamSurname || this.searchParamSpec){
        this.allDoctors = this.allDoctors.filter(doctor => 
            (this.searchParamName && doctor.firstname.includes(this.searchParamName)) ||
            (this.searchParamSurname && doctor.lastname.includes(this.searchParamSurname)) ||
            (this.searchParamSpec && doctor.specialization.includes(this.searchParamSpec))
        );
      }
    })
  }

  regusername: String;
  regpassword: string;
  regpasswordconfirm: String;
  regfirstname: String;
  reglastname: String;
  regaddress: String;
  regphone: String;
  regemail: String;

  message3: String;

  register(){
      if (!this.isPasswordValid(this.regpassword)){
        this.message2 = "New password must have a minimum of 8 characters, maximum of 14 characters, at least one uppercase letter, at least one number, at least one special character, must begin with a lowercase letter and no adjacent two characters can be the same"
        this.messageimg = ""
      }else if (this.regpassword===this.regpasswordconfirm){
        if (this.image=='../../assets/images/profilepic.jpg'){
          this.send = true;
        }
        if (this.send == true){
          //proveri da li postoji vec user sa istim korisnickim imenom
          this.userService.getUser(this.regusername).subscribe((user1: User)=>{
            if (user1){
              this.message2=""
              this.message3 = "User with that username already exists";
            }else{
              //proveri da li postoji vec user sa istim mejlom
              this.userService.getUserEmail(this.regemail).subscribe((user2: User)=>{
                if (user2){
                  this.message2=""
                  this.message3 = "User with that email already exists";
                }else{
                  this.userService.getRejectedUsername(this.regusername).subscribe((user3: Rejected)=>{
                    if (user3){
                      this.message2=""
                      this.message3 = "Request for that username was rejected";
                    }else{
                      this.userService.getRejectedEmail(this.regemail).subscribe((user4: Rejected)=>{
                        if (user4){
                          this.message2=""
                          this.message3 = "Request for that email was rejected";
                        }else{

                          this.registrationService.insertRequest(this.regusername, this.regpassword, this.regfirstname, this.reglastname, this.regaddress, this.regphone, this.regemail, this.image).subscribe(resp=>{
                            this.message2="Registration request sent"
                            this.messageimg = ""
                            this.regusername='';
                            this.regpassword='';
                            this.regfirstname='';
                            this.reglastname='';
                            this.regaddress='';
                            this.regphone='';
                            this.regemail='';
                            this.regpasswordconfirm='';
                            this.image='../../assets/images/profilepic.jpg';
                            this.router.navigate(['login']);
                          })

                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }else{
          this.messageimg="Images must be minimum of 100px width/height and maximum of 300px width/height"
          this.message2 = "";
        }
      }else{
        this.message2="Passwords must match"
        this.messageimg = ""
      }
  }

  isPasswordValid(password: string): boolean {
    const regex: RegExp = /^(?!.*(.)\1)(?=[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,14}$/;
    const isValid = regex.test(password);
    return isValid;
  }

  image: any;
  send: boolean;
  messageimg: String;

  change(event){
    let input = event.target;
    if (input.files && input.files[0]) {
      let reader = new FileReader();      

      let file = event.target.files[0];
      const img = new Image();
      img.src = window.URL.createObjectURL(input.files[0]);

      reader.readAsDataURL(input.files[0]);
      reader.onload = () => {

        const width = img.naturalWidth;
        const height = img.naturalHeight;
        console.log(width);
        console.log(height);

        if( width < 100 || height < 100 || width > 300 || height > 300 ) {
          this.send = false;
          this.image = reader.result;
        }else{
          this.send = true
          this.image = reader.result;
        }
      }
    }
  }

}
