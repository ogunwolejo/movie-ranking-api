import {createServer} from 'node:http';
import path from 'node:path'
import express from 'express'
import cors from 'cors';
import helmet from "helmet";
import * as dotenv from 'dotenv';
import * as mongoose from "mongoose";


import mainRouter from './routes/v1/app.router'

/*const getDotEnvPath = (env:string) => {
    if (env.toLowerCase() === 'TEST'.toLowerCase()) {
        return '.env.test'
    }
    return '.env'
}

//dotenv.config();
//@ts-ignore
dotenv.config({path: path.resolve(process.cwd(), getDotEnvPath(process.env.NODE_ENV.toString().toLowerCase()))})*/
dotenv.config();


class App {
    public app;
    constructor () {
        this.app = express();
        this.connectDB();
        this.initializeProject();
    }

    public initializeProject() {
        this.app.use(cors({methods:'*'}))
        this.app.use(helmet())
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.applicationRouter();
    }

    private applicationRouter() {
        this.app.use('/movie-ranking-api/v1', mainRouter)
    }

    private async connectDB() {

        try {
            //@ts-ignore
            await mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                //useFindAndModify: false,
                //useCreateIndex: true
            })
           // console.log(connected.connections);
        } catch (e:any) {
            console.log(e?.message)
        }
    }

    public listenTo() {
        //@ts-ignore
        createServer(this.app).listen(+process.env.PORT, undefined, undefined, () => {
            console.log("server is working")
        });
    }
}


export let myProjectApp = new App();


