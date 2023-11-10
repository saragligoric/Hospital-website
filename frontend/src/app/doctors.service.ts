import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from './model/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllDoctors(){
    return this.http.get(`${this.uri}/doctors/getalldoctors`)
  }

  deleteDoctor(doctor: Doctor){
    const data = {
      username: doctor.username
    }

    return this.http.post(`${this.uri}/doctors/delete`, data)
  }

  updateDoctor(doctor){
    const data = {
      doctor: doctor
    }
    return this.http.post(`${this.uri}/doctors/updateDoctor`, data)
  }

  addDoctor(username, password, firstname, lastname, phone, email, spec, branch, licence, address, type, imageurl){
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      spec: spec,
      branch: branch,
      licence: licence,
      address: address,
      type: type,
      imageurl: imageurl
    }

    return this.http.post(`${this.uri}/doctors/add`, data)
  }

  addExamination(username, title){
    const data = {
      username: username,
      title: title
    }

    return this.http.post(`${this.uri}/doctors/addExam`, data)
  }

  removeExamination(username, title){
    const data = {
      username: username,
      title: title
    }

    return this.http.post(`${this.uri}/doctors/removeExam`, data)
  }
}
