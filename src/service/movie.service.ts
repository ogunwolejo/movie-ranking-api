import MovieModel from "../model/movie.model";
import {
    AddMovieInterface,
    checkForMovieInterface,
    movieInterface,
    updateMovieInterface
} from "../interface/movie.interface";

class MovieService {
    public checkForMovie = async(arg:checkForMovieInterface) => {
        const isMovie = await MovieModel.find({
            tmbdId:arg.tmbdId,
            userId:arg.userId
        });
        if(isMovie.length > 0) {
            return true;
        }

        return false;
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
            //@ts-ignore
            movieOverview:arg.movieOverview?.trim().length > 0 ? arg.movieOverview : '',
            //@ts-ignore
            posterPath:arg.posterPath?.trim().length > 0 ? arg.posterPath : ''
        })
        return updateSelectedMovie;
    }
}

export default MovieService