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
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongodb_1 = require("mongodb");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
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
describe('Movies', () => {
    let con;
    let mongoServer;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        con = yield mongodb_1.MongoClient.connect(mongoServer.getUri(), {});
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        if (con) {
            yield con.close();
        }
        if (mongoServer) {
            yield mongoServer.stop();
        }
    }));
    describe("movie routes - no authorization token or empty string", () => {
        const _token = '';
        it("movieList - should return a status code of 404 ", () => __awaiter(void 0, void 0, void 0, function* () {
            const request = yield (0, supertest_1.default)(index_1.myProjectApp.app)
                .get("/movieList")
                .set('Authorization', `Bearer ${_token}`);
            expect(request.statusCode).toBe(404);
        }));
        it("addMovie - should return a status code of 404 ", () => __awaiter(void 0, void 0, void 0, function* () {
            const request = yield (0, supertest_1.default)(index_1.myProjectApp.app)
                .get("/addMovie")
                .set('Authorization', `Bearer ${_token}`);
            expect(request.statusCode).toBe(404);
        }));
        it("removeMovieFromList - should return a status code of 404 ", () => __awaiter(void 0, void 0, void 0, function* () {
            const request = yield (0, supertest_1.default)(index_1.myProjectApp.app)
                .get("/removeMovieFromList")
                .set('Authorization', `Bearer ${_token}`);
            expect(request.statusCode).toBe(404);
        }));
        it("a movie - should return a status code of 404 ", () => __awaiter(void 0, void 0, void 0, function* () {
            const request = yield (0, supertest_1.default)(index_1.myProjectApp.app)
                .get("/movies/123")
                .set('Authorization', `Bearer ${_token}`);
            expect(request.statusCode).toBe(404);
        }));
        it("updateMovie - should return a status code of 404 ", () => __awaiter(void 0, void 0, void 0, function* () {
            const request = yield (0, supertest_1.default)(index_1.myProjectApp.app)
                .get("/updateMovie")
                .set('Authorization', `Bearer ${_token}`);
            expect(request.statusCode).toBe(404);
        }));
        it("rankingMyMovies - should return a status code of 404 ", () => __awaiter(void 0, void 0, void 0, function* () {
            const request = yield (0, supertest_1.default)(index_1.myProjectApp.app)
                .get("/rankingMyMovies")
                .set('Authorization', `Bearer ${_token}`);
            expect(request.statusCode).toBe(404);
        }));
    });
});
describe("get movies from third party", () => {
    it('should return a 404 - has there is no Get request', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(index_1.myProjectApp.app).get("/all-movies");
        expect(statusCode).toBe(404);
    }));
});
