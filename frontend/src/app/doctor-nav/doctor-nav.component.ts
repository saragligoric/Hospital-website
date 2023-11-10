import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../session-storage.service';

@Component({
  selector: 'app-doctor-nav',
  templateUrl: './doctor-nav.component.html',
  styleUrls: ['./doctor-nav.component.css']
})
export class DoctorNavComponent implements OnInit {

  constructor(private userService: UserService, private router:Router, private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
  }

  logout(){
    this.userService.setIsAuthenticated(false);
    this.sessionStorageService.removeItem('user');
    this.router.navigate(['/']);
  }

}
