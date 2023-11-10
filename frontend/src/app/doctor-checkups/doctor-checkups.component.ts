import { Component, OnInit } from '@angular/core';
import { Appointment } from '../model/appointment';
import { Report } from '../model/report';
import { AppointmentService } from '../appointment.service';
import { SessionStorageService } from '../session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-checkups',
  templateUrl: './doctor-checkups.component.html',
  styleUrls: ['./doctor-checkups.component.css']
})
export class DoctorCheckupsComponent implements OnInit {

  allAppointments: Appointment[] = []
  firstThreeAppointments: Appointment[] = []

  constructor(private sessionStorageService: SessionStorageService, private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
    const doctor = this.sessionStorageService.getItem('user');
    const doctorUsername = doctor.username;

    this.appointmentService.getAllAppointmentsForDoctor(doctorUsername).subscribe((data:Appointment[])=>{
      this.allAppointments = data;

      const currentDate = new Date();

      this.allAppointments = this.allAppointments.filter((event) => {
        const eventDateTime = new Date(`${event.selectedDate}T${event.selectedTime}`);
        return eventDateTime > currentDate;
      });

      this.allAppointments.sort(this.compareDateAndTime);
      this.firstThreeAppointments = this.allAppointments.slice(0, 3);
    })
  }

  compareDateAndTime(a: {selectedDate: String; selectedTime: String }, b: { selectedDate: String; selectedTime: String }): number {
    const dateA = new Date(`${a.selectedDate} ${a.selectedTime}`);
    const dateB = new Date(`${b.selectedDate} ${b.selectedTime}`);
    
    if (dateA > dateB) {
      return 1;
    } else if (dateA < dateB) {
      return -1;
    } else {
      return 0;
    }
  }

  repfirstname: String;
  replastname: String;
  examDate: Date;
  examTime: Date;
  reason: String;
  diagnosis: String;
  therapy: String;
  nextDate: Date;

  appointment: Appointment;
  patientUsername: String;

  message: String;
  
  makeReport(){
    const doctor = this.sessionStorageService.getItem('user');
    const doctorUsername = doctor.username;
    const doctorFirstname = doctor.firstname;
    const doctorLastname = doctor.lastname;
    const doctorSpecialization = doctor.specialization;

    if (!this.repfirstname || !this.replastname || !this.examDate || !this.examTime || !this.reason || !this.diagnosis || !this.therapy || !this.nextDate){
      this.message = "All fields are required"
      return
    }

    this.appointmentService.getAppointmentForUser(doctorUsername, this.repfirstname, this.replastname, this.examDate, this.examTime).subscribe((data:Appointment)=>{
      if (data!=null){
        this.appointmentService.getReport(doctorUsername, this.examDate, this.examTime).subscribe((report:Report)=>{
          if (report!=null){
            this.message = "Such report already exists"
          }else {
            this.appointmentService.insertReport(this.examDate, this.examTime, doctorUsername, doctorFirstname, doctorLastname, doctorSpecialization, this.reason, this.diagnosis, this.therapy, this.nextDate, data.patientUsername, data.patientFirstname, data.patientLastname).subscribe(resp=>{
              this.message = 'Report made'
            })
          }
        })
      }else {
        this.message = "User with such an appointment doesn't exist"
      }
    })
  }

  navigate(username){
    this.router.navigate(['doctor/doctorpatientprofile', {paramUsername: username}]);
  }

}
