import {createServer} from 'node:http';
import express from 'express'
import cors from 'cors';
import helmet from "helmet";
import * as dotenv from 'dotenv';
import * as mongoose from "mongoose";

import mainRouter from './routes/v1/app.router'

dotenv.config();



class App {
    public app;
    constructor () {
        this.app = express();
        this.connectDB();
        //this.listenTo();
        this.initializeProject();
        this.applicationRouter();
    }

    private initializeProject() {
        this.app.use(cors({methods:'*'}))
        this.app.use(helmet())
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
    }

    private applicationRouter() {
        this.app.use('/movie-ranking-api/v1', mainRouter)
    }

    private async connectDB() {

        try {
            //@ts-ignore
            const connected = await mongoose.connect(process.env.MONGO_URL, {
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


