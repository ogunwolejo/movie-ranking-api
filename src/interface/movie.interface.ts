import {Schema} from "mongoose";

export interface AddMovieInterface {
    tmbdId:number;
    movieTitle:string;
    voteAverage:number;
    voteCount:number;
    movieOverview?:string;
    posterPath?:string;
    userId:string;
    ranking:number;
}

export interface updateMovieInterface {
    tmbdId:number;
    movieTitle:string;
    voteAverage:number;
    voteCount:number;
    movieOverview?:string;
    posterPath?:string;
    movieId:Schema.Types.ObjectId;
    ranking:number;
}

export interface checkForMovieInterface {
    tmbdId:number;
    userId:string;
}

export interface movieInterface {
    movieId:string;
    userId:string
}

interface myMovieInterface {
    movieId:Schema.Types.ObjectId;
    ranking:number;
    tmbdId:number;
    movieTitle:string;
    voteAverage:number;
    voteCount:number;
    movieOverview?:string;
    posterPath?:string;
}

export interface myMovieListInterface {
    data:[myMovieInterface],
    userId:string;
}