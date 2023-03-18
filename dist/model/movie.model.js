"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const IMovie = new mongoose_1.Schema({
    tmbdId: {
        type: Number,
        required: true
    },
    movieTitle: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    voteAverage: {
        type: Number,
        required: true
    },
    voteCount: {
        type: Number,
        required: true
    },
    movieOverview: {
        type: String,
        required: false,
    },
    posterPath: {
        type: String,
        required: false
    },
    popularity: {
        type: Number,
        required: false
    },
    ranking: {
        type: Number,
        required: false,
        unique: false,
        min: 1,
        default: 1
    }
});
exports.default = (0, mongoose_1.model)('movie', IMovie);
