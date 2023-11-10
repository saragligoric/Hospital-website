import express from 'express'
import { ReportsController } from '../controllers/reports.controller';

const reportsRouter = express.Router();

reportsRouter.route('/getReport').post(
    (req, res)=> new ReportsController().getReport(req, res)
)

reportsRouter.route('/insertReport').post(
    (req, res)=> new ReportsController().insertReport(req, res)
)

reportsRouter.route('/getAllUserReports').post(
    (req, res)=> new ReportsController().getAllUserReports(req, res)
)

export default reportsRouter; 