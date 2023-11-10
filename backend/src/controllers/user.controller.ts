import express from 'express'
import UserModel from '../models/user'
import RejectedModel from '../models/rejected'
import { ObjectId } from 'mongodb';
import PatientsModel from '../models/patients'

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username': username, 'password': password}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    getUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        UserModel.findOne({'username': username}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    getUserEmail = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;

        UserModel.findOne({'email': email}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    getRejectedUsername = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        RejectedModel.findOne({'username': username}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    editUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let address = req.body.address;
        let email = req.body.email;
        let phone = req.body.phone

        UserModel.updateOne({'username':username }, {$set:{'firstname': firstname, 'lastname': lastname,
        'address': address, 'phone': phone, 'email':email}}, (err, resp)=>{
            if(err) console.log(err)
            //else res.json({'message': 'updated'})
        })
        PatientsModel.updateOne({'username':username }, {$set:{'firstname': firstname, 'lastname': lastname,
        'address': address, 'phone': phone, 'email':email}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'updated'})
        })
    }

    updateUser = (req: express.Request, res: express.Response)=>{
        //zapravo je u tabeli user, nije doctor bas
        let user = req.body.user
        let doctor = req.body.doctor;

        const objectId = new ObjectId(user._id);
        //console.log(objectId)
        
        UserModel.updateOne({_id: objectId}, {$set: {'firstname': doctor.firstname, 'lastname': doctor.lastname,
                'address': doctor.address, 'phone': doctor.phone, 'email':doctor.email, 'specialization' :doctor.specialization,
                'branch': doctor.branch, 'licence': doctor.licence}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'updated'})
        })
    }

    getRejectedEmail = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;

        RejectedModel.findOne({'email': email}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    oldPassword = (req: express.Request, res: express.Response)=>{
        let password = req.body.password;

        UserModel.findOne({'password': password}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    update = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let newpass = req.body.newpass;

        UserModel.updateOne({'username': username}, {$set: {'password': newpass}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Password successfully changed'})
        })
    }
}