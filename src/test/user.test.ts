import supertest from "supertest";
import {myProjectApp} from "../index";

describe('Users', () => {
    describe("given user should be login", () => {
        it("should return 201", async() => {
            const userDetails = {
                fullName:'hannah Beans',
                email:'ogunwole888@gmail.com'
            }
            await supertest(myProjectApp.app).get('/createUser').expect(201);
        })
    })
})