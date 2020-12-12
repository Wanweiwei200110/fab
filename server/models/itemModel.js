const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
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
    numCollects: {
        type: Number,
        required: false,
        default: 0
    },
    comments: {
        type: [String],
        required: false,
        default: []
    },
    numBought: {
        type: Number,
        required: false,
        default: 0,
        min: [0, 'numBought must be at least 0.']
    },
    numCollects: {
        type: Number,
        required: false,
        default: 0,
        min: [0, 'numCollects must be at least 0.']
    },
    price: {
        type: Number,
        required: [true, 'Price cannot be empty.'],
        min: [0, 'Price must be at least 0.']
    },
}, { timestamps: true });



const Item = mongoose.model('item', itemSchema);

module.exports = Item;