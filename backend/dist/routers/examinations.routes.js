"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const examinations_controller_1 = require("../controllers/examinations.controller");
const examinationsRouter = express_1.default.Router();
examinationsRouter.route('/add').post((req, res) => new examinations_controller_1.ExaminationsController().add(req, res));
examinationsRouter.route('/getAllExaminations').get((req, res) => new examinations_controller_1.ExaminationsController().getAllExaminations(req, res));
examinationsRouter.route('/getAllExaminationsForSpec').post((req, res) => new examinations_controller_1.ExaminationsController().getAllExaminationsForSpec(req, res));
examinationsRouter.route('/getExaminationForNameSpec').post((req, res) => new examinations_controller_1.ExaminationsController().getExaminationForNameSpec(req, res));
examinationsRouter.route('/updateExamination').post((req, res) => new examinations_controller_1.ExaminationsController().updateExamination(req, res));
examinationsRouter.route('/insertRequest').post((req, res) => new examinations_controller_1.ExaminationsController().insertRequest(req, res));
examinationsRouter.route('/getAllRequests').get((req, res) => new examinations_controller_1.ExaminationsController().getAllRequests(req, res));
examinationsRouter.route('/approveRequest').post((req, res) => new examinations_controller_1.ExaminationsController().approveRequest(req, res));
examinationsRouter.route('/denyRequest').post((req, res) => new examinations_controller_1.ExaminationsController().denyRequest(req, res));
examinationsRouter.route('/deleteExamination').post((req, res) => new examinations_controller_1.ExaminationsController().deleteExamination(req, res));
exports.default = examinationsRouter;
//# sourceMappingURL=examinations.routes.js.map