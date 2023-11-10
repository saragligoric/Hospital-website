import { Component, OnInit } from '@angular/core';
import { Report } from '../model/report'
import { AppointmentService } from '../appointment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-patient-profile',
  templateUrl: './doctor-patient-profile.component.html',
  styleUrls: ['./doctor-patient-profile.component.css']
})
export class DoctorPatientProfileComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute) { }

  doctorpatientprofile: string;

  ngOnInit(): void {
    this.doctorpatientprofile = this.route.snapshot.paramMap.get("paramUsername");

    this.appointmentService.getAllUserReports(this.doctorpatientprofile).subscribe((data2: Report[])=>{
      this.allReports = data2;
    })
  }

  goBack(): void {
    window.history.back();
  }

  allReports: Report[] = []

}
