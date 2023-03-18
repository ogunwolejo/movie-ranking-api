import {Schema} from "mongoose";

export interface AddMovieInterface {
    tmbdId:number;
    movieTitle:string;
    voteAverage:number;
    voteCount:number;
    movieOverview?:string;
    posterPath?:string;
    userId:string;
}

export interface updateMovieInterface {
    tmbdId:number;
    movieTitle:string;
    voteAverage:number;
    voteCount:number;
    movieOverview?:string;
    posterPath?:string;
    movieId:Schema.Types.ObjectId;
}

export interface checkForMovieInterface {
    tmbdId:number;
    userId:string
}

export interface movieInterface {
    movieId:string;
    userId:string
}