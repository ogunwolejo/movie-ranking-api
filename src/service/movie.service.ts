import MovieModel from "../model/movie.model";
import {
    AddMovieInterface,
    checkForMovieInterface,
    movieInterface, myMovieListInterface,
    updateMovieInterface
} from "../interface/movie.interface";
import {startSession} from 'mongoose'

class MovieService {
    public checkForMovie = async(arg:checkForMovieInterface) => {
        const isMovie = await MovieModel.find({
            tmbdId:arg.tmbdId,
            userId:arg.userId
        });
        console.log(isMovie);
        if(isMovie.length > 0) {
            return true;
        }

        return false;
    }

    public getLastMovieRanking = async(userId:string) => {
        const data = await MovieModel.find({userId}).sort({ranking:1});
        //@ts-ignore
        const index:number = data.length - 1;
        const lastElement = data[index];
        return lastElement;
    }
    public addMovieToList = async(movieData:AddMovieInterface) => {
        const createMovie = await MovieModel.create(movieData);
        if(createMovie) {
            return createMovie
        }
        return createMovie;
    }

    public deleteMovie = async(movieId:string) => {
        const deleteMovie = await MovieModel.deleteOne({
            _id:movieId
        });
        if(deleteMovie.acknowledged) {
            return deleteMovie
        }

        return deleteMovie
    }

    public getMovie = async(arg:movieInterface) => {
        const movie = await MovieModel.find({
            _id:arg.movieId,
            userId:arg.userId
        }, {'__v':0, 'userId':0})
        return movie;
    }

    public userMovieList = async(userId:string) => {
        const movieList = await MovieModel.find({
            userId
        }, {'__v': 0, 'userId': 0});
        return movieList;
    }

    public updateMovie = async(arg:updateMovieInterface) => {
        const updateSelectedMovie = await MovieModel.updateOne({_id:arg.movieId}, {
            tmbdId:arg.tmbdId,
            movieTitle:arg.movieTitle,
            voteAverage:arg.voteAverage,
            voteCount:arg.voteCount,
            ranking:arg.ranking,
            //@ts-ignore
            movieOverview:arg.movieOverview?.trim().length > 0 ? arg.movieOverview : '',
            //@ts-ignore
            posterPath:arg.posterPath?.trim().length > 0 ? arg.posterPath : ''
        })
        return updateSelectedMovie;
    }

    public rankingMyMovies = async(data:myMovieListInterface) => {
        const result:any[] = [];
        data.data.forEach(async (el, i:number) => {

            const _result = await MovieModel.updateOne({_id: el.movieId, userId: data.userId}, {
                tmbdId: el.tmbdId,
                movieTitle: el.movieTitle,
                voteAverage: el.voteAverage,
                voteCount: el.voteCount,
                ranking: el.ranking,
                //@ts-ignore
                movieOverview: el.movieOverview?.trim().length > 0 ? el.movieOverview : '',
                //@ts-ignore
                posterPath: el.posterPath?.trim().length > 0 ? el.posterPath : ''
            });

            result.push(_result);
        })
        return result
    }

}

export default MovieService