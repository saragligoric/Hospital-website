import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../doctors.service';
import { Doctor } from '../model/doctor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-doctors',
  templateUrl: './patient-doctors.component.html',
  styleUrls: ['./patient-doctors.component.css']
})
export class PatientDoctorsComponent implements OnInit {

  constructor(private doctorsService: DoctorsService, private router: Router) { }

  ngOnInit(): void {
    this.doctorsService.getAllDoctors().subscribe((data: Doctor[])=>{
      this.allDoctors = data;
    })
  }

  allDoctors: Doctor[] = []

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

  searchParamName: string;
  searchParamSurname: string;
  searchParamSpec: string;
  searchParamBranch: string;

  search(){
    this.doctorsService.getAllDoctors().subscribe((data: Doctor[])=>{
      this.allDoctors = data;

      if (this.searchParamName || this.searchParamSurname || this.searchParamSpec|| this.searchParamBranch){
        this.allDoctors = this.allDoctors.filter(doctor => 
            (this.searchParamName && doctor.firstname.includes(this.searchParamName)) ||
            (this.searchParamSurname && doctor.lastname.includes(this.searchParamSurname)) ||
            (this.searchParamSpec && doctor.specialization.includes(this.searchParamSpec)) ||
            (this.searchParamBranch && doctor.branch.includes(this.searchParamBranch))
        );
      }
    })
  }

  navigate(username){
    this.router.navigate(['patient/patientdoctorprofile', {paramUsername: username}]);
  }

}
