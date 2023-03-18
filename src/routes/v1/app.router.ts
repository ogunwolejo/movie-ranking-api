import {IRouter, Router} from "express";
import UserAuthController from "../../controller/auth/user.auth.controller";
import AuthMiddleware from "../../middleware/auth.middleware";
import MoviesController from "../../controller/movies/getMovies";

class AppRouter {
    public router:IRouter = Router();
    private authController = new UserAuthController();
    private moviesController = new MoviesController();
    private authMiddleware = new AuthMiddleware().authMiddleware;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/create-user',  this.authController.createUser )

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

export default appRouter.router;