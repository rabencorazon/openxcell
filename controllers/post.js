const { Post } = require("../models/post");

const { helperUtils } = require("../utils");

async function create(request, response) {
    const { caption, topicId } = request.body;
    const userId = request.user.userId;

    const post = await Post.create({
        caption, userId,
        images: req.files.map(e => {
            return e.path.split("public")[1]
        })
    });

    return response.send(helperUtils.successObj({ message: "post created successfully!", result: topic }));
}

async function list(request, response) {

}
module.exports = { create }