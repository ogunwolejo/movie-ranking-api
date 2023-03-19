"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exception_1 = require("../util/exception");
const token_1 = __importDefault(require("../util/token"));
class AuthMiddleware {
    constructor() {
        this.token = new token_1.default();
        this.authMiddleware = (req, res, next) => {
            try {
                //@ts-ignore
                const authToken = req.headers['authorization'].split('Bearer ')[1] || null;
                if (authToken) {
                    const tokenResponse = this.token.verifyToken(authToken);
                    const userId = tokenResponse.id;
                    req.id = userId;
                    //console.log(req.id);
                    next();
                }
                else {
                    next(new exception_1.HttpException(404, 'Authentication token missing'));
                }
            }
            catch (error) {
                res.status(401).json({
                    message: error === null || error === void 0 ? void 0 : error.message
                });
            }
        };
    }
}
exports.default = AuthMiddleware;
