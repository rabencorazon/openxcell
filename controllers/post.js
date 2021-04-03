const { Post } = require("../models/post");
const { Topic } = require("../models/topic");
const { Comment } = require("../models/comment");

const { ObjectId } = require("mongoose").Types;

const { helperUtils } = require("../utils");

async function create(request, response) {
    const { caption, topicId } = request.body;
    const userId = request.user.userId;

    const topic = await Topic.findOne({ _id: topicId, userId });

    if (!topic) return response.send(helperUtils.errorObj({ message: "topic not found!" }));

    const post = await Post.create({
        caption, userId, topicId,
        images: request.files
            ? request.files.map(e => {
                return e.path.split("public")[1]
            })
            : []
    });

    return response.send(helperUtils.successObj({ message: "post created successfully!", result: post }));
}

async function list(request, response) {
    let { p: page = 1, n: limit = 999, q: search } = request.query;

    let query = { userId: ObjectId(request.user.userId) };

    if (search) query.caption = new RegExp(search, "i");

    let posts = await Post
        .aggregate([
            { $match: query },
            { $lookup: { from: "comments", localField: "_id", foreignField: "postId", as: "comments" } },
            { $skip: (parseInt(page) - 1) * parseInt(limit) },
            { $limit: parseInt(limit) }
        ]);

    let result = posts.map(post => {
        post.images = post.images.map(image => {
            let url = process.env.host;
            if (image.includes("\\")) url += image.replaceAll("\\", "/");
            else url += image;

            return url;
        });

        return post;
    });

    return response.send(helperUtils.successObj({ message: "list of posts!", result }));
}

async function addComment(request, response) {
    let { postId, comment, replyTo } = request.body;
    const userId = request.user.userId;


    let post = await Post.findOne({ _id: postId });

    if (!post) return response.send(helperUtils.errorObj({ message: "post not found!" }));

    let commentObj = { postId, comment, userId };

    if (replyTo) commentObj = { ...commentObj, replyTo }

    comment = await Comment.create(commentObj);

    return response.send(helperUtils.successObj({ message: "comment added to the post!", result: comment }));
}

module.exports = { create, list, addComment }