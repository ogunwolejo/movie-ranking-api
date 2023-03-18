import {IHttpException} from "../interface/error.interface";
import {Request, Response, NextFunction} from "express";

const errorMiddleware = (error: IHttpException, req: Request, res: Response, next: NextFunction) => {
    try {
        const status: number = error.status || 500;
        const message: string = error.message || 'Something went wrong';
        res.status(status).json({ message });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;
