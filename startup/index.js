const winston = require("winston");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const connectMongoose = require("./mongoose");
const bindSwagger = require("./swagger");
const initializeRoutes = require("./routes")

module.exports = {
    startServices: function (app) {
        connectMongoose(app)
            .then(() => bindSwagger(app))
            .then(() => bindingCommonServices(app))
            .then(() => initializeRoutes(app))
            .then(() => winston.info("All the startup services have booted up!"));
    }
}

bindingCommonServices = (app) => new Promise((resolve, reject) => {
    app.use(express.static('public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    /* use cors */
    app.use(cors());

    /* use helmet */
    // app.use(helmet());
    resolve();
})