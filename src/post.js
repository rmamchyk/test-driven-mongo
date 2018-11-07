const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String },
    content: { type: String },
    createdAt: { type: Number, default: Date.now() }
});

module.exports = PostSchema;
