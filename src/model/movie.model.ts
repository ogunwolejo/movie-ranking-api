import {Schema, model} from "mongoose";

const IMovie:Schema = new Schema({
    tmbdId: {
        type:Number,
        required:true
    },
    movieTitle: {
        type:String,
        required:true
    },
    userId: {
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    voteAverage:{
        type:Number,
        required:true
    },
    voteCount:{
        type:Number,
        required:true
    },
    movieOverview: {
        type:String,
        required:false
    },
    posterPath:{
        type:String,
        required:false
    },
    popularity:{
        type:Number,
        required:false
    }
})

export default model('movie', IMovie);