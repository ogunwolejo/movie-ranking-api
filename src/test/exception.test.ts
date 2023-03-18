import {HttpException} from "../util/exception";


describe('HttpException', () => {
    //testing for success case
    describe('except to get a httpException status of 400', () => {
        it('should return 400', () => {
            const customError = new HttpException(400, 'bad request')
            expect(customError.status).toEqual(400);
        });
    })

    // testing a failure case
    describe('except to get a httpException status not equals to 400', () => {
        it('should return value not 400', () => {
            const customError = new HttpException(500, 'server error')
            expect(customError.status).not.toEqual(400);
        });
    })
})