import { DoctorExam } from "./doctorexams";

export class User{
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    type: number;
    address: string;
    phone: string;
    email:string;
    imageurl: string;
    branch: string;
    licence: string;
    specialization: String;
    doctorExams: Array<DoctorExam>
}