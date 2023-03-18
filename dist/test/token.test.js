"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = __importDefault(require("../util/token"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
const getDotEnvPath = (env) => {
    if (env.toLowerCase() === 'TEST'.toLowerCase()) {
        return '.env.test';
    }
};
//@ts-ignore
dotenv_1.default.config({ path: node_path_1.default.resolve(process.cwd(), getDotEnvPath(process.env.NODE_ENV.toString().toLowerCase())) });
const token = new token_1.default();
describe('Token', () => {
    // generate token
    describe('generate token', () => {
        it('should return a string', () => {
            const userDetails = { email: '1234@gmail.com', id: '12333' };
            const tokenValue = token.generateTokenForCreatedUser(userDetails.email, userDetails.id);
            expect(tokenValue).not.toBeFalsy();
        });
    });
    // verify token
    describe("verify token", () => {
        it('should verify token to be true', () => {
            const userDetails = { email: '1234@gmail.com', id: '12333' };
            const tokenValue = token.generateTokenForCreatedUser(userDetails.email, userDetails.id);
            const verifyToken = token.verifyToken(tokenValue);
            expect(verifyToken).toBeTruthy();
        });
    });
    //decode token
    describe("decode token", () => {
        it('should return a truthy value', () => {
            const userDetails = { email: '1234@gmail.com', id: '12333' };
            const tokenValue = token.generateTokenForCreatedUser(userDetails.email, userDetails.id);
            const verifyToken = token.decodeToken(tokenValue);
            expect(verifyToken).toBeTruthy();
        });
        it('should return a falsy value', () => {
            const tokenValue = 'yyyyyyghghggghghgshss';
            const verifyToken = token.decodeToken(tokenValue);
            expect(verifyToken).toBeFalsy();
        });
    });
});
