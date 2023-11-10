import express from 'express'
import RegistrationModel from '../models/registration'
import UserModel from '../models/user'
import PatientsModel from '../models/patients'
import RejectedModel from '../models/rejected'

export class RegistrationController{
    
    insertreq = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let address = req.body.address;
        let phone = req.body.phone;
        let email = req.body.email;
        let imageurl = req.body.imageurl;

        const documentsToInsert = [
            {username: username, password: password, type:0, firstname:firstname, lastname:lastname, address: address, phone: phone, email:email, imageurl: imageurl}
        ];

        RegistrationModel.insertMany(documentsToInsert);
        res.json({'message': 'Request sent'})
    }

    accept = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let address = req.body.address;
        let phone = req.body.phone;
        let email = req.body.email;
        let imageurl = req.body.imageurl;

        const documentsToInsert = [
            {username: username, password: password, type:0, firstname:firstname, lastname:lastname, address: address, phone: phone, email:email, imageurl: imageurl}
        ];

        UserModel.insertMany(documentsToInsert);
        PatientsModel.insertMany(documentsToInsert);
        RegistrationModel.deleteOne({'firstname': firstname, 'lastname':lastname, 'username':username, 'password': password,
            'address': address, 'phone':phone, 'email':email, 'imageurl':imageurl}, (err, resp)=>{
            if(err) console.log(err);
            res.json({'message': 'Request sent'})
        })
    }

    reject = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let address = req.body.address;
        let phone = req.body.phone;
        let email = req.body.email;
        let imageurl = req.body.imageurl;

        RegistrationModel.deleteOne({'firstname': firstname, 'lastname':lastname, 'username':username, 'password': password,
            'address': address, 'phone':phone, 'email':email, 'imageurl':imageurl}, (err, resp)=>{
            if(err) console.log(err);
            //res.json({'message': 'Request sent'})
        })

        const documentsToInsert = [
            {username: username, email:email}
        ];
        RejectedModel.insertMany(documentsToInsert);
        res.json({'message': 'Request sent'})
    }

    getAllRegistrations = (req: express.Request, res: express.Response)=>{
        RegistrationModel.find({}, (err, examinations)=>{
            if(err) console.log(err)
            else res.json(examinations)
        })
    }
}