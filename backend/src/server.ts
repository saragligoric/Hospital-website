import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';
import doctorRouter from './routers/doctor.routes';
import registrationRouter from './routers/registration.routes';
import patientRouter from './routers/patient.routes';
import specializationsRouter from './routers/specializations.routes';
import examinationsRouter from './routers/examinations.routes';
import appointmentsRouter from './routers/appointments.router';

import bodyParser from 'body-parser';
import reportsRouter from './routers/reports.router';

const app = express();
app.use(cors())
app.use(express.json())

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

mongoose.connect('mongodb://127.0.0.1:27017/HospitalDB')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/users', userRouter)
router.use('/doctors', doctorRouter)
router.use('/patients', patientRouter)
router.use('/registration', registrationRouter)
router.use('/specializations', specializationsRouter)
router.use('/examinations', examinationsRouter)
router.use('/appointments', appointmentsRouter)
router.use('/reports', reportsRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));