"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const doctors_controller_1 = require("../controllers/doctors.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/getuser').post((req, res) => new user_controller_1.UserController().getUser(req, res));
userRouter.route('/updateUser').post((req, res) => new user_controller_1.UserController().updateUser(req, res));
userRouter.route('/edituser').post((req, res) => new user_controller_1.UserController().editUser(req, res));
userRouter.route('/getrejectedusername').post((req, res) => new user_controller_1.UserController().getRejectedUsername(req, res));
userRouter.route('/getrejectedemail').post((req, res) => new user_controller_1.UserController().getRejectedEmail(req, res));
userRouter.route('/getuseremail').post((req, res) => new user_controller_1.UserController().getUserEmail(req, res));
userRouter.route('/oldpassword').post((req, res) => new user_controller_1.UserController().oldPassword(req, res));
userRouter.route('/updatepassword').post((req, res) => new user_controller_1.UserController().update(req, res));
userRouter.route('/updatepassworddoctors').post((req, res) => new doctors_controller_1.DoctorsController().update(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map