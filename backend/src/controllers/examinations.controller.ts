import express from 'express'
import DoctorsModel from '../models/doctors'
import UserModel from '../models/user'
import ExaminationsModel from '../models/examinations'
import ExaminationsRequestsModel from '../models/examinationsRequests'
import { ObjectId } from 'mongodb'

export class ExaminationsController{
    updateExamination = (req: express.Request, res: express.Response)=>{
        let _id = req.body._id;
        let specialization = req.body.specialization
        let title = req.body.title;
        let duration = req.body.duration;
        let price = req.body.price;

        const objectId = new ObjectId(_id);

        const documentsToInsert = [
            {_id: objectId, specialization: specialization, title:title, duration:duration, price:price}
        ];

        ExaminationsModel.deleteOne({_id:objectId}, (err, resp)=>{
            if(err) console.log(err);
        })

        ExaminationsModel.insertMany(documentsToInsert);
        res.json({'message': 'Examination added'})
    }

    getAllExaminationsForSpec = (req: express.Request, res: express.Response)=>{
        let specialization = req.body.specialization;

        ExaminationsModel.find({'specialization': specialization}, (err, examinations)=>{
            if(err) console.log(err)
            else res.json(examinations)
        })

    }

    getExaminationForNameSpec = (req: express.Request, res: express.Response)=>{
        let specialization = req.body.specialization;
        let title = req.body.title;

        ExaminationsModel.findOne({'specialization': specialization, 'title': title}, (err, examinations)=>{
            if(err) console.log(err)
            else res.json(examinations)
        })
    }

    getAllExaminations = (req: express.Request, res: express.Response)=>{
        ExaminationsModel.find({}, (err, requests)=>{
            if(err) console.log(err)
            else res.json(requests)
        })
    }

    add = (req: express.Request, res: express.Response)=>{
        let specialization = req.body.specialization;
        let title = req.body.title;
        let duration = req.body.duration;
        let price = req.body.price;

        const documentsToInsert = [
            {specialization: specialization, title:title, duration:duration, price:price}
        ];

        ExaminationsModel.insertMany(documentsToInsert);
        res.json({'message': 'Examination added'})
    }

    insertRequest = (req: express.Request, res: express.Response)=>{
        let specialization = req.body.specialization;
        let title = req.body.title;
        let duration = req.body.duration;
        let price = req.body.price;

        const documentsToInsert = [
            {specialization: specialization, title:title, duration:duration, price:price}
        ];

        ExaminationsRequestsModel.insertMany(documentsToInsert);
        res.json({'message': 'Examination request added'})
    }

    getAllRequests = (req: express.Request, res: express.Response)=>{
        ExaminationsRequestsModel.find({}, (err, requests)=>{
            if(err) console.log(err)
            else res.json(requests)
        })
    }

    approveRequest = (req: express.Request, res: express.Response)=>{
        let specialization = req.body.specialization;
        let title = req.body.title;
        let duration = req.body.duration;
        let price = req.body.price;

        const documentsToInsert = [
            {specialization: specialization, title:title, duration:duration, price:price}
        ];

        ExaminationsModel.insertMany(documentsToInsert);

        ExaminationsRequestsModel.deleteOne({'specialization':specialization, 'title': title, 'duration': duration, 'price':price}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'Examination request added'})
        })

    }

    denyRequest = (req: express.Request, res: express.Response)=>{
        let specialization = req.body.specialization;
        let title = req.body.title;
        let duration = req.body.duration;
        let price = req.body.price;

        ExaminationsRequestsModel.deleteOne({'specialization':specialization, 'title': title, 'duration': duration, 'price':price}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'Examination request removed'})
        })

    }

    deleteExamination = (req: express.Request, res: express.Response)=>{
        let specialization = req.body.specialization;
        let title = req.body.title;
        let duration = req.body.duration;
        let price = req.body.price;

        ExaminationsModel.deleteOne({'specialization':specialization, 'title': title, 'duration': duration, 'price':price}, (err, resp)=>{
            if(err) console.log(err);
        })

        let titleText = req.body.title;

        DoctorsModel.findOne({'specialization': specialization}, (err, doctor)=>{
            if(err) console.log(err)
            else {
                if(doctor){
                    let title = {
                        text: titleText
                    }

                    DoctorsModel.updateOne({'username': doctor.username }, {$pull: {'doctorExams': title}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                        }
                    })
                    UserModel.updateOne({'username': doctor.username }, {$pull: {'doctorExams': title}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            res.json({'message': 'ok'})
                        }
                    })
                }
                else{
                    res.json({'message':'error'})
                }
            }
        })
    }
}