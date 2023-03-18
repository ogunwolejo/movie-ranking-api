"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myProjectApp = void 0;
const node_http_1 = require("node:http");
const node_path_1 = __importDefault(require("node:path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv = __importStar(require("dotenv"));
const mongoose = __importStar(require("mongoose"));
const app_router_1 = __importDefault(require("./routes/v1/app.router"));
const getDotEnvPath = (env) => {
    if (env.toLowerCase() === 'TEST'.toLowerCase()) {
        return '.env.test';
    }
    return '.env';
};
//dotenv.config();
//@ts-ignore
dotenv.config({ path: node_path_1.default.resolve(process.cwd(), getDotEnvPath(process.env.NODE_ENV.toString().toLowerCase())) });
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.connectDB();
        this.initializeProject();
    }
    initializeProject() {
        this.app.use((0, cors_1.default)({ methods: '*' }));
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.applicationRouter();
    }
    applicationRouter() {
        this.app.use('/movie-ranking-api/v1', app_router_1.default);
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                yield mongoose.connect(process.env.MONGO_URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    //useFindAndModify: false,
                    //useCreateIndex: true
                });
                // console.log(connected.connections);
            }
            catch (e) {
                console.log(e === null || e === void 0 ? void 0 : e.message);
            }
        });
    }
    listenTo() {
        //@ts-ignore
        (0, node_http_1.createServer)(this.app).listen(+process.env.PORT, undefined, undefined, () => {
            console.log("server is working");
        });
    }
}
exports.myProjectApp = new App();
