"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reports_controller_1 = require("../controllers/reports.controller");
const reportsRouter = express_1.default.Router();
reportsRouter.route('/getReport').post((req, res) => new reports_controller_1.ReportsController().getReport(req, res));
reportsRouter.route('/insertReport').post((req, res) => new reports_controller_1.ReportsController().insertReport(req, res));
reportsRouter.route('/getAllUserReports').post((req, res) => new reports_controller_1.ReportsController().getAllUserReports(req, res));
exports.default = reportsRouter;
//# sourceMappingURL=reports.router.js.map