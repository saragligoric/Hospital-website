import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../session-storage.service';

@Component({
  selector: 'app-patient-nav',
  templateUrl: './patient-nav.component.html',
  styleUrls: ['./patient-nav.component.css']
})
export class PatientNavComponent implements OnInit {

  constructor(private userService: UserService, private router:Router, private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
  }

  logout(){
    this.userService.setIsAuthenticated(false);
    this.sessionStorageService.removeItem('user');
    this.router.navigate(['/']);
  }

}
