import {Schema, model, ObjectId} from "mongoose";

const IUser:Schema = new Schema({
    fullName:{
        type:String,
        required:false
    },
    email: {
        type:String,
        required:true
    }
})

export default model('User', IUser);