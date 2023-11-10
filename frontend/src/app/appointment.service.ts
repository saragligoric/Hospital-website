import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  insertAppointment(patientUsername, patientFirstname, patientLastname, doctorUsername, doctorFirstname, doctorLastname, doctorBranch, selectedDate, selectedTime, examTitle, examDuration, examPrice){
    const data = {
      patientUsername: patientUsername,
      patientFirstname: patientFirstname,
      patientLastname: patientLastname,
      doctorUsername: doctorUsername,
      doctorFirstname: doctorFirstname,
      doctorLastname: doctorLastname,
      doctorBranch: doctorBranch,
      selectedDate: selectedDate,
      selectedTime: selectedTime, 
      examTitle: examTitle,
      examDuration: examDuration,
      examPrice: examPrice
    }

    return this.http.post(`${this.uri}/appointments/insertappointment`, data)
  }

  getAllAppointmentsForDoctor(doctorUsername){
    const data = {
      doctorUsername: doctorUsername
    }

    return this.http.post(`${this.uri}/appointments/getAppointmentsForDoctor`, data)
  }

  getAllUserAppointments(patientUsername){
    const data = {
      patientUsername: patientUsername
    }

    return this.http.post(`${this.uri}/appointments/getAllUserAppointments`, data)
  }

  getAllUserReports(patientUsername){
    const data = {
      patientUsername: patientUsername
    }

    return this.http.post(`${this.uri}/reports/getAllUserReports`, data)
  }

  deleteAppointment(examTitle, selectedDate, selectedTime, patientUsername){
    const data = {
      examTitle: examTitle,
      selectedDate: selectedDate,
      selectedTime: selectedTime,
      patientUsername: patientUsername
    }

    return this.http.post(`${this.uri}/appointments/deleteAppointment`, data)
  }

  getAppointmentForUser(doctorUsername, patientFirstname, patientLastname, date, time){
    const data = {
      doctorUsername: doctorUsername,
      patientFirstname: patientFirstname,
      patientLastname: patientLastname,
      date: date,
      time: time
    }

    return this.http.post(`${this.uri}/appointments/getAppointmentForUser`, data)
  }

  getReport(doctorUsername, date, time){
    const data = {
      doctorUsername: doctorUsername,
      date: date,
      time: time
    }

    return this.http.post(`${this.uri}/reports/getReport`, data)
  }

  insertReport(examDate, examTime, doctorUsername, doctorFirstname, doctorLastname, doctorSpecialization, reason, diagnosis, therapy, nextDate, patientUsername, patientFirstname, patientLastname){
    const data = {
      patientUsername: patientUsername,
      patientFirstname: patientFirstname,
      patientLastname: patientLastname,
      doctorUsername: doctorUsername,
      doctorFirstname: doctorFirstname,
      doctorLastname: doctorLastname,
      examDate: examDate,
      examTime: examTime, 
      doctorSpecialization: doctorSpecialization,
      reason: reason,
      diagnosis: diagnosis,
      therapy: therapy,
      nextDate: nextDate
    }

    return this.http.post(`${this.uri}/reports/insertReport`, data)
  }
}
