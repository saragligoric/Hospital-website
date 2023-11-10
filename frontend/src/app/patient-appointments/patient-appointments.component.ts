import { Component, OnInit } from '@angular/core';
import { Appointment } from '../model/appointment';
import { Report } from '../model/report'
import { AppointmentService } from '../appointment.service';
import { SessionStorageService } from '../session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css']
})
export class PatientAppointmentsComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private sessionStorageService: SessionStorageService, private router:Router) { }

  ngOnInit(): void {
    const data = this.sessionStorageService.getItem('user');
    const username = data.username;
    this.appointmentService.getAllUserAppointments(username).subscribe((data: Appointment[])=>{
      this.allAppointments = data;

      this.allAppointments.sort(this.compareDateAndTime);

      const currentDate = new Date();

      this.allAppointments = this.allAppointments.filter((event) => {
        const eventDateTime = new Date(`${event.selectedDate}T${event.selectedTime}`);
        return eventDateTime > currentDate;
      });

      this.appointmentService.getAllUserReports(username).subscribe((data2: Report[])=>{
        this.allReports = data2;

        this.allReports.sort(this.compareDateAndTimeAsc);
      })
    })
  }

  allReports: Report[] = []
  allAppointments: Appointment[] = []

  compareDateAndTime(a: {selectedDate: String; selectedTime: String }, b: { selectedDate: String; selectedTime: String }): number {
    const dateA = new Date(`${a.selectedDate} ${a.selectedTime}`);
    const dateB = new Date(`${b.selectedDate} ${b.selectedTime}`);
    
    if (dateA > dateB) {//descending
      return 1;
    } else if (dateA < dateB) {
      return -1;
    } else {
      return 0;
    }
  }

  compareDateAndTimeAsc(a: {selectedDate: String; selectedTime: String }, b: { selectedDate: String; selectedTime: String }): number {
    const dateA = new Date(`${a.selectedDate} ${a.selectedTime}`);
    const dateB = new Date(`${b.selectedDate} ${b.selectedTime}`);
    
    if (dateA > dateB) {//ascending
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
  }

  deleteAppointment(appointment){
    const data = this.sessionStorageService.getItem('user');
    const username = data.username;

    this.appointmentService.deleteAppointment(appointment.examTitle, appointment.selectedDate, appointment.selectedTime, appointment.patientUsername).subscribe(resp=>{
      this.appointmentService.getAllUserAppointments(username).subscribe((data: Appointment[])=>{
        this.allAppointments = data;
  
        this.allAppointments.sort(this.compareDateAndTime);
  
        const currentDate = new Date();
  
        this.allAppointments = this.allAppointments.filter((event) => {
          const eventDateTime = new Date(`${event.selectedDate}T${event.selectedTime}`);
          return eventDateTime > currentDate;
        });
      })
      
    })
    //this.router.navigate(['patient/patientappointments']);
    window.location.href = window.location.href;
  }
  
  

}
