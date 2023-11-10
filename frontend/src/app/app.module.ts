import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ManagerComponent } from './manager/manager.component';
import { LoginManagerComponent } from './login-manager/login-manager.component';
import { CarouselModule } from './carousel/carousel.module';
import { PatientNavComponent } from './patient-nav/patient-nav.component';
import { PatientDoctorsComponent } from './patient-doctors/patient-doctors.component';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { DoctorNavComponent } from './doctor-nav/doctor-nav.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorCheckupsComponent } from './doctor-checkups/doctor-checkups.component';
import { DoctorOtherComponent } from './doctor-other/doctor-other.component';
import { PatientDoctorProfileComponent } from './patient-doctor-profile/patient-doctor-profile.component';
import { DoctorPatientProfileComponent } from './doctor-patient-profile/doctor-patient-profile.component';
import { CommonModule } from '@angular/common';
import { LoginNavComponent } from './login-nav/login-nav.component';
import { LogloginComponent } from './loglogin/loglogin.component';
import { LogregisterComponent } from './logregister/logregister.component';
import { LogaboutComponent } from './logabout/logabout.component';
import { LogdoctorsComponent } from './logdoctors/logdoctors.component';
import { LogloginmanagerComponent } from './logloginmanager/logloginmanager.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PatientComponent,
    DoctorComponent,
    ManagerComponent,
    LoginManagerComponent,
    PatientNavComponent,
    PatientDoctorsComponent,
    PatientAppointmentsComponent,
    PatientProfileComponent,
    DoctorNavComponent,
    DoctorProfileComponent,
    DoctorCheckupsComponent,
    DoctorOtherComponent,
    PatientDoctorProfileComponent,
    DoctorPatientProfileComponent,
    LoginNavComponent,
    LogloginComponent,
    LogregisterComponent,
    LogaboutComponent,
    LogdoctorsComponent,
    LogloginmanagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CarouselModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
