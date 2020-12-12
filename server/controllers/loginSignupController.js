const User = require('../models/userModel');
var fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const age = 60 * 60

const handleErrors = (err) => {
    let errors = {
        username: '', 
        password: ''
    }

    if (err.message === 'Username does not exist.'){
        errors.username = 'Username does not exist.';
        return errors;
    }

    if (err.message === 'Incorrect password.'){
        errors.password = 'Incorrect password.';
        return errors;
    }

    if (err.code === 11000) {
        errors.username = 'Username already registered';
        return errors;
    }

    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

const signIn = async (user, res) => {
    const _id = user._id;
    const token = jwt.sign(
        { _id }, 
        'secret', 
        { expiresIn: age }
    );

    res.cookie(
        'jwt', 
        token, 
        { httpOnly: true, maxAge: age * 1000 }
        )
        .status(201)
        .json({ username: user.username, usertype: user.usertype, profilePic: user.profilePic });
}

module.exports.signup = async (req, res) => {
    try {
        var {username, password, usertype} = req.body;
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        const user = await User.create({username, password, usertype});
        signIn(user, res);
    } catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.login(username, password);
        signIn(user, res);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1}).send();
}

