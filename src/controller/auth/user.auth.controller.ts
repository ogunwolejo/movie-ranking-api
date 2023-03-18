import {Request, Response, NextFunction} from "express";
import {HttpException} from "../../util/exception";
import Token from "../../util/token";
import createAndAuthorizeUser from '../../service/user.service'

class UserAuthController {
    private token = new Token();
    constructor() {
    }
    public createUser = async(req:Request, res:Response, next:NextFunction) => {
        try {
            const {fullName, email} = req.body;

            const createUser = await createAndAuthorizeUser(email, fullName);

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
            //console.log(e, e?.response, e?.code )
            return res.status(400).json({
                message: e?.message,
                keyValue:e?.keyValue
            })
        }
    }
}

export default UserAuthController;