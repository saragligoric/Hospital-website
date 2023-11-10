"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registration_controller_1 = require("../controllers/registration.controller");
const registrationRouter = express_1.default.Router();
registrationRouter.route('/sendrequest').post((req, res) => new registration_controller_1.RegistrationController().insertreq(req, res));
registrationRouter.route('/accept').post((req, res) => new registration_controller_1.RegistrationController().accept(req, res));
registrationRouter.route('/reject').post((req, res) => new registration_controller_1.RegistrationController().reject(req, res));
registrationRouter.route('/getAllRegistrations').get((req, res) => new registration_controller_1.RegistrationController().getAllRegistrations(req, res));
exports.default = registrationRouter;
//# sourceMappingURL=registration.routes.js.map