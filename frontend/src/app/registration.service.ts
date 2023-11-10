import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  insertRequest(username, password, firstname, lastname, address, phone, email, imageurl){
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      address: address,
      phone: phone,
      email: email,
      imageurl: imageurl
    }

    return this.http.post(`${this.uri}/registration/sendrequest`, data)
  }

  getAllRegistrations(){
    return this.http.get(`${this.uri}/registration/getAllRegistrations`)
  }

  accept(registration){
    const data = {
      firstname: registration.firstname,
      lastname: registration.lastname,
      username: registration.username,
      password: registration.password,
      address: registration.address,
      phone: registration.phone,
      email: registration.email,
      imageurl: registration.imageurl
    }

    return this.http.post(`${this.uri}/registration/accept`, data)
  }

  reject(registration){
    const data = {
      firstname: registration.firstname,
      lastname: registration.lastname,
      username: registration.username,
      password: registration.password,
      address: registration.address,
      phone: registration.phone,
      email: registration.email,
      imageurl: registration.imageurl
    }

    return this.http.post(`${this.uri}/registration/reject`, data)
  }
}
