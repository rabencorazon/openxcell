const joi = require("joi");

module.exports = {
    "/user/register": () => joi.object({
        email: joi.string().email({ minDomainSegments: 2, tlds: {} }).required(),
        fname: joi.string().required(),
        lname: joi.string().required(),
        password: joi.string().required(),
    }),

    "/user/login": () => joi.object({
        email: joi.string().email({ minDomainSegments: 2, tlds: {} }).required(),
        password: joi.string().required(),
    })
}