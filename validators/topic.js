const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

module.exports = {
    "/topic/create": () => joi.object({
        topic: joi.string().required(),
    }),

    "/topic/my-topics": () => joi.object({
        p: joi.string().optional(),
        n: joi.string().optional(),
        q: joi.string().trim().optional()
    })
}