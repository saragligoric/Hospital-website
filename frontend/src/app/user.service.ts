import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformWorkerUi } from '@angular/common';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  private isAuthenticated = false; 

  getIsAuthenticated(): boolean { 
    return this.isAuthenticated;
  }

  setIsAuthenticated(value){ 
    this.isAuthenticated = value;
  }

  getUser(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/getuser`, data)
  }

  getUserEmail(email){
    const data = {
      email: email
    }
    return this.http.post(`${this.uri}/users/getuseremail`, data)
  }

  getRejectedUsername(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/getrejectedusername`, data)
  }

  getRejectedEmail(email){
    const data = {
      email: email
    }
    return this.http.post(`${this.uri}/users/getrejectedemail`, data)
  }

  updateUser(user, doctor){
    const data = {
      user: user,
      doctor: doctor
    }
    return this.http.post(`${this.uri}/users/updateUser`, data)
  }

  login(usernameFromForm, passwordFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post(`${this.uri}/users/login`, data)
  }

  getOldPassword(oldPassword){
    const data = {
      password: oldPassword
    }

    return this.http.post(`${this.uri}/users/oldpassword`, data)
  }

  updatePassword(username, newpass){
    const data = {
      username: username,
      newpass: newpass
    }

    return this.http.post(`${this.uri}/users/updatepassword`, data)
  }

  editUser(username, firstname, lastname, address, email, phone){
    const data = {
      username:username,
      firstname: firstname,
      lastname: lastname,
      address: address,
      email: email,
      phone: phone
    }
    return this.http.post(`${this.uri}/users/edituser`, data)
  }

  updatePasswordDoctors(username, newpass){
    const data = {
      username: username,
      newpass: newpass
    }

    return this.http.post(`${this.uri}/users/updatepassworddoctors`, data)
  }
}