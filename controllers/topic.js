const { Topic } = require("../models/topic");

const { helperUtils } = require("../utils");

async function create(request, respose) {
    const { topic: name } = request.body;
    const userId = request.user.userId;

    let existingTopic = await Topic.findOne({ name, userId });

    if (existingTopic) return response.send(helperUtils.errorObj({ message: "topic already exists!" }));

    const topic = await Topic.create({ name });

    return response.send(helperUtils.successObj({ message: "topic created successfully!", result: topic }));
}

async function del(request, response) {
    let deletedTopic = await Topic.findOneAndDelete({ _id: request.params.topicId });

    return response.send(helperUtils.successObj({ message: "topic deleted successfully!" }));
}

module.exports = { create, del }