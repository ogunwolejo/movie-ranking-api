import {MongoMemoryServer} from "mongodb-memory-server";
import { MongoClient } from 'mongodb';
import supertest from "supertest";
import {myProjectApp} from "../index";
import Token from "../util/token";
import dotenv from "dotenv";
import path from "node:path";

const getDotEnvPath = (env:string) => {
    if (env.toLowerCase() === 'TEST'.toLowerCase()) {
        return '.env.test'
    }
}
//@ts-ignore
dotenv.config({path: path.resolve(process.cwd(), getDotEnvPath(process.env.NODE_ENV.toString().toLowerCase()))})


const token = new Token()
describe('Movies', () => {
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


    describe("movie routes - no authorization token or empty string", () => {
        const _token = '';
        it("movieList - should return a status code of 404 ", async() => {
            const request = await supertest(myProjectApp.app)
                .get("/movieList")
                .set('Authorization', `Bearer ${_token}`)

            expect(request.statusCode).toBe(404);
        })

        it("addMovie - should return a status code of 404 ", async() => {
            const request = await supertest(myProjectApp.app)
                .get("/addMovie")
                .set('Authorization', `Bearer ${_token}`)

            expect(request.statusCode).toBe(404);
        })

        it("removeMovieFromList - should return a status code of 404 ", async() => {
            const request = await supertest(myProjectApp.app)
                .get("/removeMovieFromList")
                .set('Authorization', `Bearer ${_token}`)

            expect(request.statusCode).toBe(404);
        })

        it("a movie - should return a status code of 404 ", async() => {
            const request = await supertest(myProjectApp.app)
                .get("/movies/123")
                .set('Authorization', `Bearer ${_token}`)

            expect(request.statusCode).toBe(404);
        })

        it("updateMovie - should return a status code of 404 ", async() => {
            const request = await supertest(myProjectApp.app)
                .get("/updateMovie")
                .set('Authorization', `Bearer ${_token}`)

            expect(request.statusCode).toBe(404);
        })

        it("rankingMyMovies - should return a status code of 404 ", async() => {
            const request = await supertest(myProjectApp.app)
                .get("/rankingMyMovies")
                .set('Authorization', `Bearer ${_token}`)

            expect(request.statusCode).toBe(404);
        })
    })
})


describe("get movies from third party", () => {
    it('should return a 404 - has there is no Get request', async () => {
        const {statusCode} = await supertest(myProjectApp.app).get("/all-movies");
        expect(statusCode).toBe(404)
    })
})