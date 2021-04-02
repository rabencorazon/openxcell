const winston = require("winston");

const connectMongoose = require("./mongoose");
const bindSwagger = require("./swagger");
const initializeRoutes = require("./routes")

module.exports = {
    startServices: function (app) {
        connectMongoose(app)
            .then(() => bindSwagger(app))
            .then(() => initializeRoutes(app))
            .then(() => winston.info("All the startup services have booted up!"));
    }
}