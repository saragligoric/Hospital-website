import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { Examination } from '../model/examinations';
import { UserService } from '../user.service';
import { ExaminationsService } from '../examinations.service';
import { DoctorExam } from '../model/doctorexams';
import { AppointmentService } from '../appointment.service';
import { SessionStorageService } from '../session-storage.service';
import { Appointment } from '../model/appointment';

@Component({
  selector: 'app-patient-doctor-profile',
  templateUrl: './patient-doctor-profile.component.html',
  styleUrls: ['./patient-doctor-profile.component.css']
})
export class PatientDoctorProfileComponent implements OnInit {

  constructor(private router: Router, private sessionStorageService: SessionStorageService, private route: ActivatedRoute, private appointmentService: AppointmentService, private userService: UserService, private examinationsService: ExaminationsService) { }

  patientdoctorprofile: string;
  doctor: User;

  allExaminations: Examination[] = []
  filteredExaminations: Examination[] = []
  doctorExams: DoctorExam[] = []
  titlesStringsSet: Set<String>;

  ngOnInit(): void {
    this.patientdoctorprofile = this.route.snapshot.paramMap.get("paramUsername");

    this.userService.getUser(this.patientdoctorprofile).subscribe((data: User)=>{
      this.doctor = data;

      const spec = this.doctor.specialization;
      this.examinationsService.getAllExaminationsForSpec(spec).subscribe((dataaa:Examination[])=>{
        this.allExaminations = dataaa;

        this.doctorExams=this.doctor.doctorExams;
        this.filteredExaminations = this.allExaminations.filter(obj =>
          this.doctorExams.some(filterItem => filterItem.text === obj.title)
        );

        this.titlesStringsSet = this.createUniqueStringSet(this.filteredExaminations, 'title');
      })
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

  examtitle: String;
  selectedDate: Date;
  selectedTime: Date;
  exam: Examination;

  message: String;

  doctorAppointments: Appointment[] = []
  doctorDateTime: Date;
  patientDateTime: Date;
  make: boolean;
  doctorDuration: number;
  patientDuration: number;
  doctorExam : Examination;
  patientExam: Examination;
  doctorDateTimeEnd: Date;
  patientDateTimeEnd: Date;
  patientminutes: number;
  patienthours: number;
  doctorminutes: number;
  doctorhours: number;

  makeAppointment(): void{
    const isContained = this.titlesStringsSet.has(this.examtitle);
    if (!isContained){
      this.message = "Examination for requested title does not exist"
      return
    }

    this.make = true;

    const data = this.sessionStorageService.getItem('user');
    const patientUsername = data.username;
    const patientFirstname = data.firstname;
    const patientLastname = data.lastname;

    this.combineDateAndTimePatient(this.selectedDate, this.selectedTime);
    console.log(this.patientDateTime);

    const currentDate = new Date();
    if (currentDate>this.patientDateTime){
      this.message = "Selected date and time must be in the future"
      return
    }

    //dohvatanje trajanja pacijentovog termina - patientDuration number
    this.examinationsService.getExaminationForNameSpec(this.examtitle, this.doctor.specialization).subscribe((exam2:Examination)=>{
      this.patientExam = exam2;
      const durationString2 = exam2.duration;
      this.extractNumericPart2(durationString2)
      console.log(durationString2)

      //racunanje vremena kraja pacijentovog termina
      this.patientDateTimeEnd=new Date(this.patientDateTime)

      this.patientminutes = this.patientDateTime.getMinutes();
      this.patienthours = this.patientDateTime.getHours();

      var num1 = parseInt(this.patientminutes.toString());
      var num2 = parseInt(this.patientDuration.toString());
      var result = num1 + num2;
      var num3 = parseInt(this.patienthours.toString());
      if(result>=60){
        const additionalHours = Math.floor(result / 60);
        num3 = num3 + additionalHours;
        result %= 60;
      }
      this.patientDateTimeEnd.setHours(num3);
      this.patientDateTimeEnd.setMinutes(result)

      this.appointmentService.getAllAppointmentsForDoctor(this.doctor.username).subscribe((data:Appointment[])=>{
        const len = data.length
        this.doctorAppointments = data;

        var iter = 0
        this.doctorAppointments.forEach(element => {

          const dateString = element.selectedDate;
          const timeString = element.selectedTime;
  
          this.combineDateAndTime(dateString, timeString);
          const patientDateTimeString = this.patientDateTime.toISOString();
          const doctorDateTimeString = this.doctorDateTime.toISOString();
  
          if (patientDateTimeString === doctorDateTimeString){
              this.message = "Slot taken"
              this.make = false;
              return
          }
  
          //dohvatanje trajanja lekarovog termina - patientDuration number
          //this.examinationsService.getExaminationForNameSpec(element.examTitle, this.doctor.specialization).subscribe((exam1:Examination)=>{
            iter = iter + 1;
            //this.doctorExam = exam1;
            //const durationString1 = exam1.duration;
            const durationString1 = element.examDuration;
            this.extractNumericPart(durationString1)
  
            //racunanje vremena kraja lekarovog termina
            this.doctorDateTimeEnd = new Date(this.doctorDateTime);
  
            this.doctorminutes = this.doctorDateTime.getMinutes();
            this.doctorhours = this.doctorDateTime.getHours();
  
            var num4 = parseInt(this.doctorminutes.toString());
            var num5 = parseInt(this.doctorDuration.toString());
            var result2 = num4 + num5;
            var num6 = parseInt(this.doctorhours.toString());
            if(result2>=60){
              const additionalHours2 = Math.floor(result2 / 60);
              num6 = num6 + additionalHours2;
              result2 %= 60;
            }
            this.doctorDateTimeEnd.setHours(num6);
            this.doctorDateTimeEnd.setMinutes(result2)

            if  (this.patientDateTime.getDate() === this.doctorDateTime.getDate() && this.patientDateTime>this.doctorDateTime && this.patientDateTime<this.doctorDateTimeEnd){
              this.message = "Slot taken"
              this.make = false;
              return
            }
    
            if  (this.patientDateTime.getDate() === this.doctorDateTime.getDate() && this.patientDateTimeEnd>this.doctorDateTime && this.patientDateTimeEnd<this.doctorDateTimeEnd){
              this.message = "Slot taken"
              this.make = false;
              return;
            }  

            if (this.make==true && iter==len){
              this.examinationsService.getExaminationForNameSpec(this.examtitle, this.doctor.specialization).subscribe((examination: Examination)=>{
                const exam = examination;
                this.appointmentService.insertAppointment(patientUsername, patientFirstname, patientLastname, this.doctor.username, this.doctor.firstname, this.doctor.lastname, this.doctor.branch, this.selectedDate, this.selectedTime, this.examtitle, exam.duration, exam.price).subscribe(resp=>{
                  this.examtitle = '';
                  this.message = 'Appointment made'
                  this.router.navigate(['patientdoctorprofile'])
                  return
                })
              })
            }
          //})
        })
      })
    })    
  }

  extractNumericPart(durationString) {
    if (durationString) {
      this.doctorDuration = durationString.replace(/\D/g, '');
    }
  }

  extractNumericPart2(durationString) {
    if (durationString) {
      this.patientDuration = durationString.replace(/\D/g, '');
    }
  }

  combineDateAndTime(dateString, timeString) {
    const dateParts = dateString.split('-');
    const timeParts = timeString.split(':');

    // Parse the date and time components
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Month is 0-based
    const day = parseInt(dateParts[2]);
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    // Create a new Date object by setting date and time components
    this.doctorDateTime = new Date(year, month, day, hours, minutes);
  }

  combineDateAndTimePatient(dateString, timeString) {
    const dateParts = dateString.split('-');
    const timeParts = timeString.split(':');

    // Parse the date and time components
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Month is 0-based
    const day = parseInt(dateParts[2]);
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    // Create a new Date object by setting date and time components
    this.patientDateTime = new Date(year, month, day, hours, minutes);
  }

  goBack(): void {
    window.history.back();
  }
}
