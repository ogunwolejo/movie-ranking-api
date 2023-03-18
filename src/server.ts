import {myProjectApp} from "./index";

class Server {
    constructor() {
        console.log(process.env.NODE_ENV);
        myProjectApp.listenTo()
    }
}

new Server();