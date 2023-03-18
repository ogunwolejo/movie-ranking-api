"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    constructor() {
        this.generateTokenForCreatedUser = (email, id) => {
            //@ts-ignore
            return jsonwebtoken_1.default.sign({ id, email }, process.env.tokenKey, { algorithm: 'HS256', expiresIn: '7d' }); //expires in 7days
        };
        this.verifyToken = (token) => {
            //@ts-ignore
            return jsonwebtoken_1.default.verify(token, process.env.tokenKey, { algorithm: 'HS256', expiresIn: '7d' });
        };
        this.decodeToken = (token) => {
            //@ts-ignore
            return jsonwebtoken_1.default.decode(token, process.env.tokenKey, { algorithm: 'HS256' });
        };
    }
}
exports.default = Token;
