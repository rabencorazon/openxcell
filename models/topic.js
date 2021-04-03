const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "users" },
}, {
    timestamps: true
});

const Topic = mongoose.model('topic', TopicSchema);

module.exports = { Topic }