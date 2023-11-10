import express from 'express'
import ReportsModel from '../models/reports'

export class ReportsController{

    getReport = (req: express.Request, res: express.Response)=>{
        let doctorUsername = req.body.doctorUsername;
        let date = req.body.date;
        let time = req.body.time;

        ReportsModel.findOne({'doctorUsername': doctorUsername, 'selectedDate':date, 'selectedTime':time}, (err, examinations)=>{
            if(err) console.log(err)
            else res.json(examinations)
        })
    }

    getAllUserReports = (req: express.Request, res: express.Response)=>{
        let patientUsername = req.body.patientUsername;

        ReportsModel.find({'patientUsername': patientUsername}, (err, examinations)=>{
            if(err) console.log(err)
            else res.json(examinations)
        })
    }

    insertReport = (req: express.Request, res: express.Response)=>{
        let patientUsername = req.body.patientUsername;
        let patientFirstname = req.body.patientFirstname;
        let patientLastname = req.body.patientLastname;
        let doctorUsername = req.body.doctorUsername;
        let doctorFirstname = req.body.doctorFirstname;
        let doctorLastname = req.body.doctorLastname;
        let doctorSpecialization = req.body.doctorSpecialization;
        let date = req.body.examDate;
        let time = req.body.examTime;
        let nextDate = req.body.nextDate;
        let reason = req.body.reason;
        let diagnosis = req.body.diagnosis;
        let therapy = req.body.therapy;
        const documentsToInsert = [
            {patientUsername: patientUsername, patientFirstname: patientFirstname, patientLastname: patientLastname, doctorUsername: doctorUsername, doctorFirstname: doctorFirstname, doctorLastname: doctorLastname,
            doctorSpecialization: doctorSpecialization, selectedDate: date, selectedTime: time,
            nextDate: nextDate, reason:reason, diagnosis:diagnosis, therapy:therapy}
        ];

        ReportsModel.insertMany(documentsToInsert);
        res.json({'message': 'Report made'})
    }
}