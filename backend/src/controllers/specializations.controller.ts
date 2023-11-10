import express from 'express'
import SpecializationsModel from '../models/specializations'

export class SpecializationsController{
    add = (req: express.Request, res: express.Response)=>{
        let title = req.body.title;

        const documentsToInsert = [
            {title:title}
        ];

        SpecializationsModel.insertMany(documentsToInsert);
        res.json({'message': 'Specialization added'})
    }
}