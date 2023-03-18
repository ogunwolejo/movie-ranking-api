import {MongoMemoryServer} from "mongodb-memory-server";
import UserAuthController from "../controller/auth/user.auth.controller";
import { MongoClient } from 'mongodb';
import supertest from "supertest";
import {myProjectApp} from "../index";

describe('User', () => {
    let con: MongoClient;
    let mongoServer: MongoMemoryServer;

    beforeAll(async() => {
        mongoServer = await MongoMemoryServer.create();
        con = await MongoClient.connect(mongoServer.getUri(), {});
    })

    afterAll(async() => {
        if (con) {
            await con.close();
        }
        if (mongoServer) {
            await mongoServer.stop();
        }
    })


    describe('creation and authorization of user', () => {
        it('should return a 404', async() => {
            const user = {fullName:"joshua ogunwole", email:"123@gmail.com"}
            await supertest(myProjectApp.app).post("/create-user").send(user).expect(404);
        })
    })
})

