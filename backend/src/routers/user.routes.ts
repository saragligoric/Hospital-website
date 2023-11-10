import express from 'express'
import { UserController } from '../controllers/user.controller';
import { DoctorsController } from '../controllers/doctors.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/getuser').post(
    (req, res)=>new UserController().getUser(req, res)
)

userRouter.route('/updateUser').post(
    (req, res)=> new UserController().updateUser(req, res)
)

userRouter.route('/edituser').post(
    (req, res)=> new UserController().editUser(req, res)
)

userRouter.route('/getrejectedusername').post(
    (req, res)=>new UserController().getRejectedUsername(req, res)
)

userRouter.route('/getrejectedemail').post(
    (req, res)=>new UserController().getRejectedEmail(req, res)
)

userRouter.route('/getuseremail').post(
    (req, res)=>new UserController().getUserEmail(req, res)
)

userRouter.route('/oldpassword').post(
    (req, res)=>new UserController().oldPassword(req, res)
)

userRouter.route('/updatepassword').post(
    (req, res)=> new UserController().update(req, res)
)

userRouter.route('/updatepassworddoctors').post(
    (req, res)=> new DoctorsController().update(req, res)
)

export default userRouter; 