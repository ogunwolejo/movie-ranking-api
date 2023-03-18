"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exception_1 = require("../util/exception");
describe('HttpException', () => {
    //testing for success case
    describe('except to get a httpException status of 400', () => {
        it('should return 400', () => {
            const customError = new exception_1.HttpException(400, 'bad request');
            expect(customError.status).toEqual(400);
        });
    });
    // testing a failure case
    describe('except to get a httpException status not equals to 400', () => {
        it('should return value not 400', () => {
            const customError = new exception_1.HttpException(500, 'server error');
            expect(customError.status).not.toEqual(400);
        });
    });
});
