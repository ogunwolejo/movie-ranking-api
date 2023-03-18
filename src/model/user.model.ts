import {Schema, model, ObjectId} from "mongoose";

const IUser:Schema = new Schema({
    fullName:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    }
})

export default model('User', IUser);