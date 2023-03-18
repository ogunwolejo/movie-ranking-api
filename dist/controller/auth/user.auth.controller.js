"use strict";
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
const exception_1 = require("../../util/exception");
const token_1 = __importDefault(require("../../util/token"));
const user_service_1 = __importDefault(require("../../service/user.service"));
class UserAuthController {
    constructor() {
        this.token = new token_1.default();
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { fullName, email } = req.body;
                const createUser = yield (0, user_service_1.default)(email, fullName);
                if (createUser) {
                    //@ts-ignore
                    const userId = createUser._id.toString();
                    const userToken = this.token.generateTokenForCreatedUser(createUser.email, userId);
                    return res.status(201).json({
                        user: createUser,
                        token: userToken
                    });
                }
                return new exception_1.HttpException(500, 'Unable to create data');
            }
            catch (e) {
                //console.log(e, e?.response, e?.code )
                return res.status(400).json({
                    message: e === null || e === void 0 ? void 0 : e.message,
                    keyValue: e === null || e === void 0 ? void 0 : e.keyValue
                });
            }
        });
    }
}
exports.default = UserAuthController;
