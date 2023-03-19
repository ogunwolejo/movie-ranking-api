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
const movie_model_1 = __importDefault(require("../model/movie.model"));
class MovieService {
    constructor() {
        this.checkForMovie = (arg) => __awaiter(this, void 0, void 0, function* () {
            const isMovie = yield movie_model_1.default.find({
                tmbdId: arg.tmbdId,
                userId: arg.userId
            });
            console.log(isMovie);
            if (isMovie.length > 0) {
                return true;
            }
            return false;
        });
        this.getLastMovieRanking = (userId) => __awaiter(this, void 0, void 0, function* () {
            const data = yield movie_model_1.default.find({ userId }).sort({ ranking: 1 });
            //@ts-ignore
            const index = data.length - 1;
            const lastElement = data[index];
            return lastElement;
        });
        this.addMovieToList = (movieData) => __awaiter(this, void 0, void 0, function* () {
            const createMovie = yield movie_model_1.default.create(movieData);
            if (createMovie) {
                return createMovie;
            }
            return createMovie;
        });
        this.deleteMovie = (movieId) => __awaiter(this, void 0, void 0, function* () {
            const deleteMovie = yield movie_model_1.default.deleteOne({
                _id: movieId
            });
            if (deleteMovie.acknowledged) {
                return deleteMovie;
            }
            return deleteMovie;
        });
        this.getMovie = (arg) => __awaiter(this, void 0, void 0, function* () {
            const movie = yield movie_model_1.default.find({
                _id: arg.movieId,
                userId: arg.userId
            }, { '__v': 0, 'userId': 0 });
            return movie;
        });
        this.userMovieList = (userId) => __awaiter(this, void 0, void 0, function* () {
            const movieList = yield movie_model_1.default.find({
                userId
            }, { '__v': 0, 'userId': 0 });
            return movieList;
        });
        this.updateMovie = (arg) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const updateSelectedMovie = yield movie_model_1.default.updateOne({ _id: arg.movieId }, {
                tmbdId: arg.tmbdId,
                movieTitle: arg.movieTitle,
                voteAverage: arg.voteAverage,
                voteCount: arg.voteCount,
                ranking: arg.ranking,
                //@ts-ignore
                movieOverview: ((_a = arg.movieOverview) === null || _a === void 0 ? void 0 : _a.trim().length) > 0 ? arg.movieOverview : '',
                //@ts-ignore
                posterPath: ((_b = arg.posterPath) === null || _b === void 0 ? void 0 : _b.trim().length) > 0 ? arg.posterPath : ''
            });
            return updateSelectedMovie;
        });
        this.rankingMyMovies = (data) => __awaiter(this, void 0, void 0, function* () {
            return data.data.forEach((el, i) => __awaiter(this, void 0, void 0, function* () {
                var _c, _d;
                const _result = yield movie_model_1.default.updateOne({ _id: el.movieId, userId: data.userId }, {
                    tmbdId: el.tmbdId,
                    movieTitle: el.movieTitle,
                    voteAverage: el.voteAverage,
                    voteCount: el.voteCount,
                    ranking: el.ranking,
                    //@ts-ignore
                    movieOverview: ((_c = el.movieOverview) === null || _c === void 0 ? void 0 : _c.trim().length) > 0 ? el.movieOverview : '',
                    //@ts-ignore
                    posterPath: ((_d = el.posterPath) === null || _d === void 0 ? void 0 : _d.trim().length) > 0 ? el.posterPath : ''
                });
                //console.log(`elNo - ${i}`, _result);
                return _result;
            }));
        });
    }
}
exports.default = MovieService;
