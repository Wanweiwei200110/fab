const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title cannot be empty.'],
    },
    body: {
        type: String,
        required: [true, 'Body cannot be empty.'],
    },
    images: {
        type: [String],
        required: false
    },
    numLikes: {
        type: Number,
        required: false,
        default: 0,
        min: [0, 'numLikes must be at least 0.']
    },
    numCollects: {
        type: Number,
        required: false,
        default: 0,
        min: [0, 'numCollects must be at least 0.']
    },
    author: {
        type: String,
        required: [true, 'Author cannot be empty.']
    },
    reported: {
        type: Boolean,
        required: false,
        default: false
    },
    link: {
        type: String,
        required: false
    }
}, { timestamps: true });


const Post = mongoose.model('post', postSchema);

module.exports = Post;