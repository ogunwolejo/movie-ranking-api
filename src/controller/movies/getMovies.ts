import {NextFunction, Request, Response} from "express";
import Axios from 'axios';
import {HttpException} from "../../util/exception";
import MovieModel from "../../model/movie.model";
import {ObjectId, Schema} from "mongoose";

class MoviesController {
    //getting the movies from the external movie database
    public getAllMovies = async(req:Request, res:Response, next:NextFunction) => {
        try {
            // get page number
            let {pageNo} = req.body;
            if(!pageNo || pageNo === 0) {
                pageNo = 1; // setting the minimum value to 1
            }
            const movieData = await Axios.get(`${process.env.TMBD_URL}popular?api_key=${process.env.TMBD_KEY}&language=en-US&page=${pageNo}`);
            console.log(movieData.data.results.length);

            if(movieData.data) return res.status(200).json({movies:movieData.data});


            return new HttpException(404, 'Movies current not available')

        } catch (e:any) {
            //console.log(e);
            res.status(e.response.status).json({
                message:e.response.data.status_message
            })
        }
    }
    
    
    //adding a movie to a user movie list
    public addMovieToMovieList = async(req:Request, res:Response, next:NextFunction) => {
        try {
            const {tmbdId, movieTitle, voteAverage, voteCount, movieOverview, posterPath } = req.body;

            // check if the movie user is adding already exist in the user's list
            //@ts-ignore
            const getMovie = await this.checkForMovie(tmbdId, req?.id);

            if(getMovie) {
                return res.status(200).json({
                    message: 'You already have this movie in your list'
                });
            }

            const addMovie = await MovieModel.create({
                tmbdId,
                movieTitle,
                voteAverage,
                voteCount,
                movieOverview,
                posterPath,
                //@ts-ignore
                userId: req?.id
            })

            if(addMovie) {
                res.status(200).json({
                    movie:addMovie,
                    message: 'movie added to list'
                })
            } else {
                throw Error();
            }

        } catch (e:any) {
            res.status(e.response.status).json({
                message:e.response.data.status_message
            })
        }
    }

    private checkForMovie = async(movieId:number, userId:string) => {
        const isMovie = await MovieModel.find({
            tmbdId:movieId,
            userId
        });


        if(isMovie.length > 0) {
            return true;
        }

        return false;
    }


    // delete a movie from your list
    public deleteMovieFromList = async(req:Request, res:Response) => {
        const {movieId, tmbdId} = req.body;
        try {
            // check if the movie to be deleted is in the user list
            //@ts-ignore
            const getMovie = await this.checkForMovie(tmbdId, req?.id);

            if(!getMovie) {
                return res.status(404).json({
                    message: 'This movie is not in your list'
                })
            }

            const deleteMovie = await MovieModel.deleteOne({
                _id:movieId
            });

            if(deleteMovie.acknowledged) {
                return res.status(200).json({
                    message: "movie has been deleted",
                    deletedCount: deleteMovie.deletedCount
                })
            }

        } catch (e:any) {
            console.log(e);
            res.status(500).json({
                message:'error'
            })
        }
    }

    //find a movie
    public findMovie = async(req:Request, res:Response) => {
        try {
            const {movieTitle, movieId} = req.body;
            const getMovie = await MovieModel.find({
                //movieTitle,
                _id:movieId,
                //@ts-ignore
                userId:req?.id
            }, {'__v':0, 'userId':0})


            if(getMovie) {
                return res.status(200).json({
                    movie:getMovie
                })
            }

            throw new Error('No Movie was Founds')
        } catch(e:any) {
            //console.log(e)
            res.status(e.response.status).json({
                message:e.response.data.statusMessage
            })
        }

    }

    // show movieList
    public movieList = async(req:Request, res:Response) => {
        try {
            const list = await MovieModel.find({
                //@ts-ignore
                userId:req?.id
            },{'__v':0, 'userId':0})

            return res.status(200).json({
                movieList:list,
                count:list.length
            })
        } catch (e:any) {
            res.status(e.response.status).json({
                message:e.response.data.statusMessage
            })
        }
    }

    //update a movie
    public updateMovie = async(req:Request, res:Response) => {
        try {
            const {movieId, tmbdId, movieTitle, voteAverage, voteCount, movieOverview, posterPath } = req.body;

            // check if the movie to be deleted is in the user list
            //@ts-ignore
            const getMovie = await this.checkForMovie(tmbdId, req?.id);

            if(!getMovie) {
                return res.status(404).json({
                    message: 'This movie is not in your list'
                })
            }

            const updateMovie = await MovieModel.updateOne(movieId, {
                tmbdId,
                movieTitle,
                voteAverage,
                voteCount,
                movieOverview:movieOverview?.trim().length > 0 ? movieOverview : '',
                posterPath:posterPath?.trim().length > 0 ? posterPath : ''
            })

            if(updateMovie) {
                return res.status(200).json({
                    movie:updateMovie,
                    message:'Movie has been updated'
                })
            } else {
                throw new Error('Unable to update the selected movie')
            }

        } catch (e:any) {
            res.status(500).json({
                message:e.message
            })
        }
    }

}

export default MoviesController;