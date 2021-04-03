const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

module.exports = {
    "/post/create": () => joi.object({
        topicId: joi.objectId().required(),
        caption: joi.string().required(),
    }).options({
        allowUnknown: true,
        stripUnknown: true
    }),

    "/post/my-posts": () => joi.object({
        p: joi.string().optional(),
        n: joi.string().optional(),
        q: joi.string().trim().optional(),
    }),

    "/post/add-comment": () => joi.object({
        postId: joi.objectId().required(),
        comment: joi.string().required(),
        replyTo: joi.objectId().optional(),
    }),
}