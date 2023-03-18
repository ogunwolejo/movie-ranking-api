import {NextFunction, Request, Response} from "express";
import Axios from 'axios';
import {HttpException} from "../../util/exception";
import MovieService from "../../service/movie.service";

class MoviesController {
    private movieService = new MovieService();
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
            console.log(e);
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
            const [getMovie, lastMovie]:[any] = await Promise.allSettled([this.movieService.checkForMovie({tmbdId, userId:req?.id}), this.movieService.getLastMovieRanking(req?.id)]);
            if(getMovie?.value) {
                return res.status(200).json({
                    message: 'You already have this movie in your list'
                });
            }
            //console.log(getMovie, lastMovie);

            // checking if the ranking from the last element is available, if it is, increment it by 1 else make it 1
            //@ts-ignore
            let newMovieRanking:number = !lastMovie?.value ? 1 : lastMovie.value?.ranking + 1;

            const addMovie = await this.movieService.addMovieToList({
                tmbdId,
                movieTitle,
                voteAverage,
                voteCount,
                movieOverview,
                posterPath,
                //@ts-ignore
                userId: req?.id,
                ranking: newMovieRanking
            })

            if(addMovie) {
                res.status(200).json({
                    movie:addMovie,
                    message: 'movie added to list'
                })
            } else {
                throw Error('Movie not add');
            }

        } catch (e:any) {
            //console.log(e);
            res.status(400).json({
                message:e.message
            })
        }
    }


    // delete a movie from your list
    public deleteMovieFromList = async(req:Request, res:Response) => {
        const {movieId, tmbdId} = req.body;
        try {
            // check if the movie to be deleted is in the user list
            //@ts-ignore
            const getMovie = await this.movieService.checkForMovie({tmbdId, userId:req?.id});

            if(!getMovie) {
                return res.status(404).json({
                    message: 'This movie is not in your list'
                })
            }

            const deleteMovie = await this.movieService.deleteMovie(movieId)

            if(deleteMovie.acknowledged) {
                return res.status(200).json({
                    message: "movie has been deleted",
                    deletedCount: deleteMovie.deletedCount
                })
            }

            if(!deleteMovie.acknowledged) {
                throw new Error('Unable to delete Movie');
            }

        } catch (e:any) {
            res.status(400).json({
                message:e.message
            })
        }
    }

    //find a movie
    public findMovie = async(req:Request, res:Response) => {

        try {
            const {movieId} = req.params;
            //const {movieId} = req.body;
            //@ts-ignore
            const getMovie = await this.movieService.getMovie({movieId, userId:req.id})
            if(getMovie) {
                return res.status(200).json({
                    movie:getMovie
                })
            }

            throw new Error('No Movie was Found')
        } catch(e:any) {
            res.status(400).json({
                message:e.message
            })
        }

    }

    // show movieList
    public movieList = async(req:Request, res:Response) => {
        try {
            //@ts-ignore
            const list = await this.movieService.userMovieList(req.id)
            return res.status(200).json({
                movieList:list,
                count:list.length
            })
        } catch (e:any) {
            res.status(400).json({
                message:e.message
            })
        }
    }

    //update a movie
    public updateMovie = async(req:Request, res:Response) => {
        try {
            const {movieId, tmbdId, movieTitle, voteAverage, voteCount, movieOverview, posterPath, ranking } = req.body;

            // check if the movie to be deleted is in the user list
            //@ts-ignore
            const getMovie = await this.movieService.checkForMovie({tmbdId, userId:req?.id});

            if(!getMovie) {
                return res.status(404).json({
                    message: 'This movie is not in your list'
                })
            }

            const updateMovie = await this.movieService.updateMovie({movieId, tmbdId, movieTitle, voteAverage, voteCount, movieOverview, posterPath, ranking })

            if(updateMovie.acknowledged) {
                return res.status(200).json({
                    movie:updateMovie,
                    message:'Movie has been updated'
                })
            } else {
                throw new Error('Unable to update the selected movie')
            }

        } catch (e:any) {
            res.status(400).json({
                message:e.message
            })
        }
    }


    public rankMyMovieList = async(req:Request, res:Response) => {
        try {
            const {data} = req.body;
            //@ts-ignore
            const myRanking = this.movieService.rankingMyMovies({userId:req.id, data});
            console.log(`ranking data: ${myRanking}`)

            return res.status(200).json({rankedList:myRanking})
        } catch (e:any) {
            console.log(e);
            res.status(400).json({
                message:e.message
            })
        }
    }

}

export default MoviesController;