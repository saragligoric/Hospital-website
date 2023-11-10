import express from 'express'
import AppointmentsModel from '../models/appointment'

export class AppointmentsController{
    
    insertAppointment = (req: express.Request, res: express.Response)=>{
        let patientUsername = req.body.patientUsername;
        let patientFirstname = req.body.patientFirstname;
        let patientLastname = req.body.patientLastname;
        let doctorUsername = req.body.doctorUsername;
        let doctorFirstname = req.body.doctorFirstname;
        let doctorLastname = req.body.doctorLastname;
        let doctorBranch = req.body.doctorBranch;
        let selectedDate = req.body.selectedDate;
        let selectedTime = req.body.selectedTime; 
        let examTitle = req.body.examTitle;
        let examDuration = req.body.examDuration;
        let examPrice = req.body.examPrice

        const documentsToInsert = [
            {patientUsername: patientUsername, patientFirstname: patientFirstname, patientLastname: patientLastname, doctorUsername: doctorUsername, doctorFirstname: doctorFirstname, doctorLastname: doctorLastname,
            doctorBranch: doctorBranch, selectedDate: selectedDate, selectedTime:selectedTime, examTitle: examTitle,
            examDuration: examDuration, examPrice: examPrice}
        ];

        AppointmentsModel.insertMany(documentsToInsert);
        res.json({'message': 'Appointment made'})
    }

    getAppointmentsForDoctor = (req: express.Request, res: express.Response)=>{
        let doctorUsername = req.body.doctorUsername;

        AppointmentsModel.find({'doctorUsername': doctorUsername}, (err, examinations)=>{
            if(err) console.log(err)
            else res.json(examinations)
        })
    }

    getAllUserAppointments = (req: express.Request, res: express.Response)=>{
        let patientUsername = req.body.patientUsername;

        AppointmentsModel.find({'patientUsername': patientUsername}, (err, examinations)=>{
            if(err) console.log(err)
            else res.json(examinations)
        })
    }

    deleteAppointment = (req: express.Request, res: express.Response)=>{
        let examTitle = req.body.examTitle;
        let selectedDate = req.body.selectedDate;
        let selectedTime = req.body.selectedTime;
        let patientUsername = req.body.patientUsername;

        AppointmentsModel.deleteOne({'examTitle':examTitle, 'selectedDate':selectedDate, 'selectedTime':selectedTime, 'patientUsername':patientUsername}, (err, resp)=>{
            if(err) console.log(err);
        })
    }

    getAppointmentForUser = (req: express.Request, res: express.Response)=>{
        let doctorUsername = req.body.doctorUsername;
        let patientFirstname = req.body.patientFirstname;
        let patientLastname = req.body.patientLastname;
        let date = req.body.date;
        let time = req.body.time;

        AppointmentsModel.findOne({'doctorUsername': doctorUsername, 'patientFirstname': patientFirstname, 'patientLatname': patientLastname, 'selectedDate': date, 'selectedTime': time}, (err, examinations)=>{
            if(err) console.log(err)
            else res.json(examinations)
        })
    }
}