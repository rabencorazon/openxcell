const { Topic } = require("../models/topic");

const { helperUtils } = require("../utils");

async function create(request, response) {
    const { topic: name } = request.body;
    const userId = request.user.userId;

    let existingTopic = await Topic.findOne({ name, userId });

    if (existingTopic) return response.send(helperUtils.errorObj({ message: "topic already exists!" }));

    const topic = await Topic.create({ name, userId });

    return response.send(helperUtils.successObj({ message: "topic created successfully!", result: topic }));
}

async function del(request, response) {
    let deletedTopic = await Topic.findOneAndDelete({ _id: request.params.topicId });

    return response.send(helperUtils.successObj({ message: "topic deleted successfully!" }));
}

async function list(request, response) {
    let { page = 1, limit = 999, search } = req.body;

    let query = { userId: require.user.userId };

    if (search) query.name = new RegExp(search, "i");

    let topics = await Topics
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit);

    return response.send(helperUtils.successObj({ message: "list of topics!" }));
}

module.exports = { create, del }