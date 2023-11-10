import express from 'express'
import { ExaminationsController } from '../controllers/examinations.controller';

const examinationsRouter = express.Router();

examinationsRouter.route('/add').post(
    (req, res)=> new ExaminationsController().add(req, res)
)

examinationsRouter.route('/getAllExaminations').get(
    (req, res)=> new ExaminationsController().getAllExaminations(req, res)
)

examinationsRouter.route('/getAllExaminationsForSpec').post(
    (req, res)=> new ExaminationsController().getAllExaminationsForSpec(req, res)
)

examinationsRouter.route('/getExaminationForNameSpec').post(
    (req, res)=> new ExaminationsController().getExaminationForNameSpec(req, res)
)

examinationsRouter.route('/updateExamination').post(
    (req, res)=> new ExaminationsController().updateExamination(req, res)
)

examinationsRouter.route('/insertRequest').post(
    (req, res)=> new ExaminationsController().insertRequest(req, res)
)

examinationsRouter.route('/getAllRequests').get(
    (req, res)=> new ExaminationsController().getAllRequests(req, res)
)

examinationsRouter.route('/approveRequest').post(
    (req, res)=> new ExaminationsController().approveRequest(req, res)
)

examinationsRouter.route('/denyRequest').post(
    (req, res)=> new ExaminationsController().denyRequest(req, res)
)

examinationsRouter.route('/deleteExamination').post(
    (req, res)=> new ExaminationsController().deleteExamination(req, res)
)


export default examinationsRouter;