import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExaminationsService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  getAllExaminations(){
    return this.http.get(`${this.uri}/examinations/getAllExaminations`)
  }

  deleteExamination(specialization, title, duration, price){
    const data = {
      specialization: specialization,
      title:title,
      duration: duration,
      price: price
    }

    return this.http.post(`${this.uri}/examinations/deleteExamination`, data)
  }

  getAllExaminationsForSpec(spec){
    const data = {
      specialization: spec
    }

    return this.http.post(`${this.uri}/examinations/getAllExaminationsForSpec`, data)
  }

  updateExamination(examination, duration, price){
    const data = {
      _id: examination._id,
      specialization: examination.specialization,
      title: examination.title,
      duration: duration,
      price: price
    }
    return this.http.post(`${this.uri}/examinations/updateExamination`, data)
  }

  getExaminationForNameSpec(examtitle, specialization){
    const data = {
      specialization: specialization,
      title: examtitle
    }

    return this.http.post(`${this.uri}/examinations/getExaminationForNameSpec`, data)
  }

  addExamination(specialization, title, duration, price){
    const data = {
      specialization: specialization,
      title:title,
      duration: duration,
      price: price
    }

    return this.http.post(`${this.uri}/examinations/add`, data)
  }

  insertRequest(specialization, examinationTitle, examinationDuration, examinationPrice){
    const data = {
      specialization: specialization,
      title: examinationTitle,
      duration: examinationDuration,
      price: examinationPrice
    }

    return this.http.post(`${this.uri}/examinations/insertRequest`, data)
  }

  getAllRequests(){
    return this.http.get(`${this.uri}/examinations/getAllRequests`)
  }

  approveRequest(specialization, title, duration, price){
    const data = {
      specialization: specialization,
      title: title,
      duration: duration,
      price: price
    }

    return this.http.post(`${this.uri}/examinations/approveRequest`, data)
  }

  denyRequest(specialization, title, duration, price){
    const data = {
      specialization: specialization,
      title: title,
      duration: duration,
      price: price
    }

    return this.http.post(`${this.uri}/examinations/denyRequest`, data)
  }

}
