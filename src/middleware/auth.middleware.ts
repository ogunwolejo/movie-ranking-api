import { Response, NextFunction } from 'express';
import { HttpException } from '../util/exception';
import { IToken, RequestTokenHandler } from '../interface/auth.interface';
import Token from "../util/token";


class AuthMiddleware {
    private token = new Token();
    public authMiddleware = (req: RequestTokenHandler, res: Response, next: NextFunction) => {
        try {
            //@ts-ignore
            const authToken = req.headers['authorization'].split('Bearer ')[1] || null
            if (authToken) {
                const tokenResponse = this.token.verifyToken(authToken);
                const userId = tokenResponse.id
                req.id = userId;
                //console.log(req.id);
                next();
            } else {
                next(new HttpException(404, 'Authentication token missing'))
            }
        } catch (error:any) {
            res.status(401).json({
                message: error?.message
            })
        }
    }

}

export default AuthMiddleware;
