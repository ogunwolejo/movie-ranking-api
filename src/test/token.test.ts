import Token from "../util/token";
import dotenv from 'dotenv';
import path from "node:path";
import {JsonWebTokenError} from "jsonwebtoken";

const getDotEnvPath = (env:string) => {
    if (env.toLowerCase() === 'TEST'.toLowerCase()) {
        return '.env.test'
    }
}
//@ts-ignore
dotenv.config({path: path.resolve(process.cwd(), getDotEnvPath(process.env.NODE_ENV.toString().toLowerCase()))})

const token = new Token();
describe('Token', () => {
    // generate token
    describe('generate token', () => {
        it('should return a string', () => {
            const userDetails = {email:'1234@gmail.com', id:'12333'};
            const tokenValue = token.generateTokenForCreatedUser(userDetails.email, userDetails.id);
            expect(tokenValue).not.toBeFalsy();
        })
    })

    // verify token
    describe("verify token", () => {
        it('should verify token to be true', () => {
            const userDetails = {email:'1234@gmail.com', id:'12333'};
            const tokenValue = token.generateTokenForCreatedUser(userDetails.email, userDetails.id);
            const verifyToken = token.verifyToken(tokenValue);
            expect(verifyToken).toBeTruthy()
        })
    })

    //decode token
    describe("decode token", () => {
        it('should return a truthy value', () => {
            const userDetails = {email:'1234@gmail.com', id:'12333'};
            const tokenValue = token.generateTokenForCreatedUser(userDetails.email, userDetails.id);
            const verifyToken = token.decodeToken(tokenValue);
            expect(verifyToken).toBeTruthy();
        })

        it('should return a falsy value', () => {
            const tokenValue = 'yyyyyyghghggghghgshss';
            const verifyToken = token.decodeToken(tokenValue);
            expect(verifyToken).toBeFalsy();
        })
    })

})