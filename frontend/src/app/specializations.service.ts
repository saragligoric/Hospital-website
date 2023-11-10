import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecializationsService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  addSpec(title){
    const data = {
      title:title
    }

    return this.http.post(`${this.uri}/specializations/add`, data)
  }
}
