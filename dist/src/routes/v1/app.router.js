"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_auth_controller_1 = __importDefault(require("../../controller/auth/user.auth.controller"));
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const getMovies_1 = __importDefault(require("../../controller/movies/getMovies"));
class AppRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authController = new user_auth_controller_1.default();
        this.moviesController = new getMovies_1.default();
        this.authMiddleware = new auth_middleware_1.default().authMiddleware;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/create-user', this.authController.createUser);
        // movies section
        this.router.post('/all-movies', this.moviesController.getAllMovies); // getting the list of movies from tmbd
        //@ts-ignore
        this.router.post('/addMovie', this.authMiddleware, this.moviesController.addMovieToMovieList);
        //@ts-ignore
        this.router.delete('/removeMovieFromList', this.authMiddleware, this.moviesController.deleteMovieFromList);
        //@ts-ignore
        this.router.get('/movies/:movieId', this.authMiddleware, this.moviesController.findMovie);
        // @ts-ignore
        this.router.get('/movieList', this.authMiddleware, this.moviesController.movieList);
        //@ts-ignore
        this.router.post('/updateMovie', this.authMiddleware, this.moviesController.updateMovie);
        //@ts-ignore
        this.router.post('/rankingMyMovies', this.authMiddleware, this.moviesController.rankMyMovieList);
    }
}
const appRouter = new AppRouter();
exports.default = appRouter.router;
