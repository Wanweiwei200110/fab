const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNum: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    items: [{item: String, qty: Number, title: String}],
    total: {
        type: Number,
        required: true
    }
 
}, { timestamps: true });


const Order = mongoose.model('order', orderSchema);

module.exports = Order;