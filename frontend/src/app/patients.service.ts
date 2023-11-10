import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from './model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllPatients(){
    return this.http.get(`${this.uri}/patients/getallpatients`)
  }

  deletePatient(patient: Patient){
    const data = {
      username: patient.username
    }

    return this.http.post(`${this.uri}/patients/delete`, data)
  }

  updatePatient(patient){
    const data = {
      patient: patient
    }
    return this.http.post(`${this.uri}/patients/updatePatient`, data)
  }
}
