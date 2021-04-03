const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment: { type: String, default: "" },
    userId: { type: mongoose.Types.ObjectId, ref: "users" },
    postId: { type: mongoose.Types.ObjectId, ref: "posts" },
    comment: { type: String, required: true },
    replyTo: this
}, {
    timestamps: true
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = { Comment }