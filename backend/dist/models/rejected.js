"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Rejected = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    }
});
exports.default = mongoose_1.default.model('RejectedModel', Rejected, 'rejected');
//# sourceMappingURL=rejected.js.map