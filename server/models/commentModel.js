const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    target: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: false,
        default: 0
    },
    content:{
        type: String,
        required: [true, 'Comment can not be empty.']
    },
    reported:{
        type: Boolean,
        required: false,
        default: false
    }
}, { timestamps: true });



const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;