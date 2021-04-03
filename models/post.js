const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    caption: { type: String, default: "" },
    images: { type: [String] },
    topicId: { type: mongoose.Types.ObjectId, ref: "topics" },
    userId: { type: mongoose.Types.ObjectId, ref: "users" }
}, {
    timestamps: true
});

const Post = mongoose.model('post', PostSchema);

module.exports = { Post }