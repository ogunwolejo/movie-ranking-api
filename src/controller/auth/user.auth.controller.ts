import {Request, Response, NextFunction} from "express";
import UserModel from "../../model/user.model";
import {HttpException} from "../../util/exception";
import Token from "../../util/token";

class UserAuthController {
    private token = new Token();
    constructor() {
    }
    public createUser = async(req:Request, res:Response, next:NextFunction) => {
        try {
            const {fullName, email} = req.body;

            const createUser = await UserModel.create({
                fullName,
                email
            })

            if(createUser) {
                //@ts-ignore
                const userId:string = createUser._id.toString();
                const userToken:string = this.token.generateTokenForCreatedUser(createUser.email, userId);
                return res.status(201).json({
                    user:createUser,
                    token:userToken
                })
            }

            return new HttpException(500, 'Unable to create data');

        } catch (e:any) {
            //console.log(e)
            return res.status(e.response.status).json({
                message: e.response.data.status_message
            })
        }
    }
}

export default UserAuthController;