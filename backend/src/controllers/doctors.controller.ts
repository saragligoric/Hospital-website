import express from 'express'
import DoctorsModel from '../models/doctors'
import UserModel from '../models/user'
import { ObjectId } from 'mongodb'

export class DoctorsController{
    getAllDoctors = (req: express.Request, res: express.Response)=>{
        DoctorsModel.find({}, (err, doctors)=>{
            if(err) console.log(err)
            else res.json(doctors)
        })
    }

    updateDoctor = (req: express.Request, res: express.Response)=>{
        let doctor = req.body.doctor;

        const objectId = new ObjectId(doctor._id);
        
        DoctorsModel.updateOne({_id: objectId}, {$set: {'firstname': doctor.firstname, 'lastname': doctor.lastname,
                'address': doctor.address, 'phone': doctor.phone, 'email':doctor.email, 'specialization' :doctor.specialization,
                'branch': doctor.branch, 'licence': doctor.licence}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'updated'})
        })
    }

    update = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let newpass = req.body.newpass;

        DoctorsModel.updateOne({'username': username}, {$set: {'password': newpass}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Password successfully changed'})
        })
    }

    delete = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        DoctorsModel.deleteOne({'username': username}, (err, resp)=>{
            if(err) console.log(err);
            //else res.json({'message': 'deleted doctor'})
        })
        UserModel.deleteOne({'username': username}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'deleted user'})
        })
    }

    add = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let phone = req.body.phone;
        let email = req.body.email;
        let spec = req.body.spec;
        let branch = req.body.branch;
        let licence = req.body.licence;
        let address = req.body.address;
        let type = req.body.type;
        let imageurl = req.body.imageurl;

        const documentsToInsert = [
            {username: username, password: password, firstname:firstname, lastname:lastname, phone: phone, email:email,
            specialization: spec, branch: branch, licence:licence, address:address, type: type, imageurl: imageurl}
        ];

        DoctorsModel.insertMany(documentsToInsert);
        UserModel.insertMany(documentsToInsert);
        res.json({'message': 'Doctor added'})
    }

    addExam = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let titleText = req.body.title;

        DoctorsModel.findOne({'username': username}, (err, doctor)=>{
            if(err) console.log(err)
            else {
                if(doctor){
                    let title = {
                        text: titleText
                    }
                    DoctorsModel.updateOne({'username': doctor.username }, {$push: {'doctorExams': title}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            //res.json({'message': 'ok'})
                        }
                    })
                    UserModel.updateOne({'username': doctor.username }, {$push: {'doctorExams': title}}, (err, resp)=>{
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

    removeExam = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let titleText = req.body.title;

        DoctorsModel.findOne({'username': username}, (err, doctor)=>{
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