"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const specializations_controller_1 = require("../controllers/specializations.controller");
const specializationRouter = express_1.default.Router();
specializationRouter.route('/add').post((req, res) => new specializations_controller_1.SpecializationsController().add(req, res));
exports.default = specializationRouter;
//# sourceMappingURL=specializations.routes.js.map