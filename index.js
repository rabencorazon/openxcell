require("dotenv").config();

const winston = require("winston");
const app = require("express")();
const startup = require("./startup");

let { port, host, protocol } = process.env;

let server;

if (!protocol || protocol !== "https") server = require("http").createServer(app);
else {
    /* we'll using this block create a secured server with the help of ssl certificates */

    const fs = require("fs");

    server = require("https").createServer({
        key: fs.readFileSync(process.env.key),
        cert: fs.readFileSync(process.env.cert)
    }, app);
}

server.listen(port, () => {
    winston.info(`The application has booted, follow the link for doc : ${host}/api-docs`);
    startup.startServices(app);
});

