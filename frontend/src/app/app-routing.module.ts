import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ManagerComponent } from './manager/manager.component';
import { LoginManagerComponent } from './login-manager/login-manager.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { PatientDoctorsComponent } from './patient-doctors/patient-doctors.component';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorCheckupsComponent } from './doctor-checkups/doctor-checkups.component';
import { DoctorOtherComponent } from './doctor-other/doctor-other.component';
import { PatientDoctorProfileComponent } from './patient-doctor-profile/patient-doctor-profile.component';
import { DoctorPatientProfileComponent } from './doctor-patient-profile/doctor-patient-profile.component';
import { LogdoctorsComponent } from './logdoctors/logdoctors.component';
import { LogaboutComponent } from './logabout/logabout.component';
import { LogloginComponent } from './loglogin/loglogin.component';
import { LogregisterComponent } from './logregister/logregister.component';
import { LogloginmanagerComponent } from './logloginmanager/logloginmanager.component';

const routes: Routes = [
  {path: "", component: LoginComponent,
  children: [
    { path: '', redirectTo: 'aboutus', pathMatch: 'full' },
    { path: 'aboutus', component: LogaboutComponent },
    { path: 'doctors', component: LogdoctorsComponent },
    { path: 'login', component: LogloginComponent},
    { path: 'register', component: LogregisterComponent },
    { path: 'loginmanager', component: LogloginmanagerComponent }
   ]},
  {path: "patient",
   component: PatientComponent,
   children: [
    { path: '', redirectTo: 'patientprofile', pathMatch: 'full' },
    { path: 'patientprofile', component: PatientProfileComponent },
    { path: 'patientdoctors', component: PatientDoctorsComponent},
    { path: 'patientappointments', component: PatientAppointmentsComponent },
    { path: 'patientdoctorprofile', component: PatientDoctorProfileComponent },
   ]
  },
  {path: "doctor",
   component: DoctorComponent,
   children: [
    { path: '', redirectTo: 'doctorprofile', pathMatch: 'full' },
    { path: 'doctorprofile', component: DoctorProfileComponent },
    { path: 'doctorcheckups', component: DoctorCheckupsComponent },
    { path: 'doctorother', component: DoctorOtherComponent },
    { path: 'doctorpatientprofile', component: DoctorPatientProfileComponent },
   ]
  },
  {path: "manager", component: ManagerComponent},
  {path: "loginManager", component:LoginManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
