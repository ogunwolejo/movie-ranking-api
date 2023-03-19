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
const axios_1 = __importDefault(require("axios"));
const exception_1 = require("../../util/exception");
const movie_service_1 = __importDefault(require("../../service/movie.service"));
class MoviesController {
    constructor() {
        this.movieService = new movie_service_1.default();
        //getting the movies from the external movie database
        this.getAllMovies = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // get page number
                let { pageNo } = req.body;
                if (!pageNo || pageNo === 0) {
                    pageNo = 1; // setting the minimum value to 1
                }
                const movieData = yield axios_1.default.get(`${process.env.TMBD_URL}popular?api_key=${process.env.TMBD_KEY}&language=en-US&page=${pageNo}`);
                console.log(movieData.data.results.length);
                if (movieData.data)
                    return res.status(200).json({ movies: movieData.data });
                return new exception_1.HttpException(404, 'Movies current not available');
            }
            catch (e) {
                console.log(e);
                res.status(e.response.status).json({
                    message: e.response.data.status_message
                });
            }
        });
        //adding a movie to a user movie list
        this.addMovieToMovieList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { tmbdId, movieTitle, voteAverage, voteCount, movieOverview, posterPath } = req.body;
                // check if the movie user is adding already exist in the user's list
                //@ts-ignore
                const [getMovie, lastMovie] = yield Promise.allSettled([this.movieService.checkForMovie({ tmbdId, userId: req === null || req === void 0 ? void 0 : req.id }), this.movieService.getLastMovieRanking(req === null || req === void 0 ? void 0 : req.id)]);
                if (getMovie === null || getMovie === void 0 ? void 0 : getMovie.value) {
                    return res.status(200).json({
                        message: 'You already have this movie in your list'
                    });
                }
                //console.log(getMovie, lastMovie);
                // checking if the ranking from the last element is available, if it is, increment it by 1 else make it 1
                //@ts-ignore
                let newMovieRanking = !(lastMovie === null || lastMovie === void 0 ? void 0 : lastMovie.value) ? 1 : ((_a = lastMovie.value) === null || _a === void 0 ? void 0 : _a.ranking) + 1;
                const addMovie = yield this.movieService.addMovieToList({
                    tmbdId,
                    movieTitle,
                    voteAverage,
                    voteCount,
                    movieOverview,
                    posterPath,
                    //@ts-ignore
                    userId: req === null || req === void 0 ? void 0 : req.id,
                    ranking: newMovieRanking
                });
                if (addMovie) {
                    res.status(200).json({
                        movie: addMovie,
                        message: 'movie added to list'
                    });
                }
                else {
                    throw Error('Movie not add');
                }
            }
            catch (e) {
                //console.log(e);
                res.status(400).json({
                    message: e.message
                });
            }
        });
        // delete a movie from your list
        this.deleteMovieFromList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { movieId, tmbdId } = req.body;
            try {
                // check if the movie to be deleted is in the user list
                //@ts-ignore
                const getMovie = yield this.movieService.checkForMovie({ tmbdId, userId: req === null || req === void 0 ? void 0 : req.id });
                if (!getMovie) {
                    return res.status(404).json({
                        message: 'This movie is not in your list'
                    });
                }
                const deleteMovie = yield this.movieService.deleteMovie(movieId);
                if (deleteMovie.acknowledged) {
                    return res.status(200).json({
                        message: "movie has been deleted",
                        deletedCount: deleteMovie.deletedCount
                    });
                }
                if (!deleteMovie.acknowledged) {
                    throw new Error('Unable to delete Movie');
                }
            }
            catch (e) {
                res.status(400).json({
                    message: e.message
                });
            }
        });
        //find a movie
        this.findMovie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { movieId } = req.params;
                //const {movieId} = req.body;
                //@ts-ignore
                const getMovie = yield this.movieService.getMovie({ movieId, userId: req.id });
                if (getMovie) {
                    return res.status(200).json({
                        movie: getMovie
                    });
                }
                throw new Error('No Movie was Found');
            }
            catch (e) {
                return res.status(400).json({
                    message: e.message
                });
            }
        });
        // show movieList
        this.movieList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const list = yield this.movieService.userMovieList(req.id);
                return res.status(200).json({
                    movieList: list,
                    count: list.length
                });
            }
            catch (e) {
                return res.status(400).json({
                    message: e.message
                });
            }
        });
        //update a movie
        this.updateMovie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { movieId, tmbdId, movieTitle, voteAverage, voteCount, movieOverview, posterPath, ranking } = req.body;
                // check if the movie to be deleted is in the user list
                //@ts-ignore
                const getMovie = yield this.movieService.checkForMovie({ tmbdId, userId: req === null || req === void 0 ? void 0 : req.id });
                if (!getMovie) {
                    return res.status(404).json({
                        message: 'This movie is not in your list'
                    });
                }
                const updateMovie = yield this.movieService.updateMovie({ movieId, tmbdId, movieTitle, voteAverage, voteCount, movieOverview, posterPath, ranking });
                if (updateMovie.acknowledged) {
                    return res.status(200).json({
                        movie: updateMovie,
                        message: 'Movie has been updated'
                    });
                }
                else {
                    throw new Error('Unable to update the selected movie');
                }
            }
            catch (e) {
                res.status(400).json({
                    message: e.message
                });
            }
        });
        this.rankMyMovieList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = req.body;
                //@ts-ignore
                const myRanking = this.movieService.rankingMyMovies({ userId: req.id, data });
                console.log(`ranking data: ${myRanking}`);
                return res.status(200).json({ rankedList: myRanking });
            }
            catch (e) {
                console.log(e);
                res.status(400).json({
                    message: e.message
                });
            }
        });
    }
}
exports.default = MoviesController;
