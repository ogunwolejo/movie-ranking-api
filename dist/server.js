"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class Server {
    constructor() {
        index_1.myProjectApp.listenTo();
    }
}
new Server();
