const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var fs = require('fs');
const path = require('path');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be empty.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.']
    },
    usertype: {
        type: String,
        required: [true, 'Please given a usertype']
    },
    profilePic: {
        type: String, 
        required: false,
        default: 'https://firebasestorage.googleapis.com/v0/b/csc309-5e855.appspot.com/o/profilePics%2Fdefaultuser.png?alt=media&token=3619fe6d-f7b6-4d10-b318-82313ddd9cb7'
    },
    intro: {
        type: String,
        required: false,
        default: 'Write something to introduce yourself.'
    },
    followings: {
        type: [String],
        required: false,
        default: []
    },
    followers: {
        type: [String],
        required: false,
        default: []
    },
    postCollections: {
        type: [String],
        required: false,
        default: []
    },
    itemCollections: {
        type: [String],
        required: false,
        default: []
    },
    cart: {
        type: [{item: String, qty: Number}],
        required: false,
        default: []
    },
    orderHistory: {
        type: [String],
        required: false,
        default: []
    },
    likedPosts: {
        type: [String],
        required: false,
        default: []
    },
    upvoted: {
        type: [String],
        required: false,
        default: []
    },
    downvoted: {
        type: [String],
        required: false,
        default: []
    }
});

// userSchema.post('init', async function(next){
//     console.log('init')
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     // next();
// })

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({username});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password.');
    }
    throw Error('Username does not exist.');
}

const User = mongoose.model('user', userSchema);

module.exports = User;