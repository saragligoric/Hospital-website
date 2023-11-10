"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const doctor_routes_1 = __importDefault(require("./routers/doctor.routes"));
const registration_routes_1 = __importDefault(require("./routers/registration.routes"));
const patient_routes_1 = __importDefault(require("./routers/patient.routes"));
const specializations_routes_1 = __importDefault(require("./routers/specializations.routes"));
const examinations_routes_1 = __importDefault(require("./routers/examinations.routes"));
const appointments_router_1 = __importDefault(require("./routers/appointments.router"));
const body_parser_1 = __importDefault(require("body-parser"));
const reports_router_1 = __importDefault(require("./routers/reports.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/HospitalDB');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/users', user_routes_1.default);
router.use('/doctors', doctor_routes_1.default);
router.use('/patients', patient_routes_1.default);
router.use('/registration', registration_routes_1.default);
router.use('/specializations', specializations_routes_1.default);
router.use('/examinations', examinations_routes_1.default);
router.use('/appointments', appointments_router_1.default);
router.use('/reports', reports_router_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map