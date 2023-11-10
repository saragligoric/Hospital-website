import express from 'express'
import PatientsModel from '../models/patients'
import { ObjectId } from 'mongodb'

export class PatientsController{
    getAllPatients = (req: express.Request, res: express.Response)=>{
        PatientsModel.find({}, (err, patients)=>{
            if(err) console.log(err)
            else res.json(patients)
        })
    }

    delete = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        PatientsModel.deleteOne({'username': username}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'deleted patient'})
        })
    }

    updatePatient = (req: express.Request, res: express.Response)=>{
        let doctor = req.body.patient;

        const objectId = new ObjectId(doctor._id);
        
        PatientsModel.updateOne({_id: objectId}, {$set: {'firstname': doctor.firstname, 'lastname': doctor.lastname,
                'address': doctor.address, 'phone': doctor.phone, 'email':doctor.email}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'updated'})
        })
    }
}