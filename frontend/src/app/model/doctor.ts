import { DoctorExam } from "./doctorexams";

export class Doctor{
    _id: string;
    firstname: String;
    lastname: String;
    username: String;
    password: String;
    type: number;
    address: string;
    phone: string;
    email:string;
    specialization: String;
    imageurl: String;
    branch: string;
    licence: string;
    doctorExams: Array<DoctorExam>;
    isEditing: boolean = false;
}