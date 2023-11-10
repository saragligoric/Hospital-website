"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecializationsController = void 0;
const specializations_1 = __importDefault(require("../models/specializations"));
class SpecializationsController {
    constructor() {
        this.add = (req, res) => {
            let title = req.body.title;
            const documentsToInsert = [
                { title: title }
            ];
            specializations_1.default.insertMany(documentsToInsert);
            res.json({ 'message': 'Specialization added' });
        };
    }
}
exports.SpecializationsController = SpecializationsController;
//# sourceMappingURL=specializations.controller.js.map