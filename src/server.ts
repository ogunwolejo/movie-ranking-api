import {myProjectApp} from "./index";

class Server {
    constructor() {
        myProjectApp.listenTo()
    }
}

new Server();

//cross-env NODE_ENV=production pm2 start ./build/src/server.js -i max