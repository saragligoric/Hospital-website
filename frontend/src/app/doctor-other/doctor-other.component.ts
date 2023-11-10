import { Component, OnInit } from '@angular/core';
import { ExaminationsService } from '../examinations.service';
import { SessionStorageService } from '../session-storage.service';

@Component({
  selector: 'app-doctor-other',
  templateUrl: './doctor-other.component.html',
  styleUrls: ['./doctor-other.component.css']
})
export class DoctorOtherComponent implements OnInit {

  constructor(private examinationService: ExaminationsService, private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
  }


  examinationTitle: String;
  examinationDuration: string;
  examinationPrice: String;

  message: String;

  request(){
    var isValidFormat
    const pattern = /^[0-9]+m$/;
    isValidFormat = pattern.test(this.examinationDuration);
    if (!isValidFormat){
      this.message = "Duration must be in format Xm where X represents a number"
      return
    }

    const data = this.sessionStorageService.getItem('user');
    const specialization = data.specialization;

      this.examinationService.insertRequest(specialization, this.examinationTitle, this.examinationDuration, this.examinationPrice).subscribe(resp=>{
        this.message = "Request sent"
      })
  }



}
