# Movie Ranking API
This API allows users to perform CRUD operations on movie data and also rank movies. The API is designed to be user-friendly and provides an easy way to manage movie data.

## Getting Started
To use this API, you will need to follow the instructions below:

1. Clone the repository
2. Install the required dependencies
3. Run the application
4. Use the API endpoints to perform CRUD operations and ranking of movies

## Installation
To install the dependencies for this API, run the following command: **npm install**

## Running the Application
To run the application, run the following command:
1. npm start
2. npm watch
3. npm dev
4. npm dev-watch

## API Endpoints
The API endpoints for this application are as follows:

### GET /movieList
This endpoint retrieves all movies in the database for the particular user.

### GET /movies/:movieId
This endpoint retrieves a single movie from the database based on the provided movie ID, for the particular user.

### POST /addMovie
This endpoint adds a new movie to the database. The body of the request should contain the following information:
### Required fields
tmbdId
movieTitle
voteAverage
voteCount

### Optional Fields
movieOverview
Ranking
posterPath

### DELETE /removeMovieFromList
This endpoint deletes an existing movie from the database based on the following fields:
1. movieId
2. tmbdId

### POST /updateMovie
This endpoint allows users to update a movie. The body of the request should contain the following information:
### Required fields
tmbdId
movieTitle
voteAverage
voteCount

### Optional Fields
movieOverview
Ranking
posterPath

### POST /rankingMyMovies
This endpoint allows users to rank their movie list at a go . The body of the request should contain the following information:

data - which is an array of the movie document

### POST /all-movies
The end point for getting the list of movies from tmbd API, the body of the request should contain a pageNo. 

## Postman Documentation
The Postman documentation for this API can be found https://documenter.getpostman.com/view/6819527/2s93JzMLb9. The documentation provides an overview of the API endpoints and includes examples of how to use each endpoint.