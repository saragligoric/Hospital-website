import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { SessionStorageService } from '../session-storage.service';

@Component({
  selector: 'app-login-manager',
  templateUrl: './login-manager.component.html',
  styleUrls: ['./login-manager.component.css']
})
export class LoginManagerComponent implements OnInit {

  constructor(private userService: UserService, private router:Router, private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
      if(userFromDB!=null){
        if(userFromDB.type==2){
          this.userService.setIsAuthenticated(true);
          this.sessionStorageService.setItem('user', { firstname: userFromDB.firstname, lastname: userFromDB.lastname,  username: userFromDB.username, password: userFromDB.password, type: userFromDB.type, address: userFromDB.address, phone: userFromDB.phone, email: userFromDB.email, imageurl: userFromDB.imageurl});
          this.router.navigate(['manager']);
        }
      }
      else{
        this.message="Error"
      }
    })
  } 

}
