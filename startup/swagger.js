const winston = require('winston');

module.exports = (app) => new Promise((resolve, reject) => {
    try {
        const swagger = require("express-swagger-generator")(app);

        let options = {
            swaggerDefinition: {
                info: {
                    description: 'APIs for Practical Round',
                    title: 'Node Server for openxcell',
                    version: '1.0.0',
                },
                host: process.env.host,
                basePath: '/api',
                produces: [
                    "application/json"
                ],
                schemes: ['http'],//
                securityDefinitions: {
                    User: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'x-auth-token',
                        description: "",
                    }
                }
            },
            basedir: __dirname, //app absolute path
            files: ['./../routes/*.js'] //Path to the API handle folder
        };

        swagger(options);

        resolve();
    } catch (error) {
        winston.error(`There was some error binding swagger to the app : ${error}`);

        reject(error);
    }
})