const User = require('../models/userModel');
const Post = require('../models/postModel');
const Item = require('../models/itemModel')
const Order = require('../models/orderModel');
const e = require('express');


module.exports.getUser = (req, res) => {
    try {
        User.findOne({ username: req.params.username })
            .then(value => {
                res.send({
                    username: value.username,
                    profilePic: value.profilePic,
                    intro: value.intro,
                    orderHistory: value.orderHistory
                });
            })
    } catch (err) {
        console.log(err);
    }
}

module.exports.uploadProfile = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.params.username });
        user.profilePic = req.body.url;
        user.save();
        res.send();
    } catch (err) {
        console.log(err)
    }
}

module.exports.posts_get = async (req, res) => {
    try {
        console.log('get')
        const posts = await Post.find({ author: req.params.username })
        console.log(posts)
        res.send({ posts })
    } catch (err) {
        console.log(err)
    }
}

module.exports.follolwUser = async (req, res) => {
    try {
        let target = await User.findOne({ username: req.params.username })
        let user = await User.findOne({ username: req.body.username })
        user.followings.push(req.params.username)
        target.followers.push(req.body.username)
        await user.save()
        await target.save()
        res.send()
    } catch (err) {
        console.log(err);
    }
}

module.exports.unfollolwUser = async (req, res) => {
    try {
        let target = await User.findOne({ username: req.params.username })
        let user = await User.findOne({ username: req.body.username })
        user.followings.splice(user.followings.indexOf(req.params.username), 1)
        target.followers.splice(target.followers.indexOf(req.body.username), 1)
        await user.save()
        await target.save()
        res.send()
    } catch (err) {
        console.log(err);
    }
}

module.exports.cart_patch = async (req, res) => {
    try{
    let user = await User.findOne({ username: req.body.username })
    let index = user.cart.findIndex(element => element.item === req.params.item_id)
    console.log(user.cart)
    console.log(req.params.item_id)
    if (req.body.qty === 0 && index !== -1) {
        user.cart.splice(index, 1)
    } else if (index !== -1) {
        user.cart[index].qty = req.body.qty
    } else {
        user.cart.push({ item: req.params.item_id, qty: req.body.qty })
    }
    await user.save()
    res.send()
    }
    catch(err){
        console.log(err)
    }
}

module.exports.cart_get = async (req, res) => {
    try{
    let user = await User.findOne({username: req.params.username})
    let cart = []
    for (let i = 0; i < user.cart.length; i++) {
        let item = await Item.findById(user.cart[i].item)
        cart.push({
            item: item,
            qty: user.cart[i].qty
        })
    }
    res.send(cart)
    }
    catch(err){
        console.log(err)
    }
}

module.exports.cart_clean = async (req, res) => {
    try{
    let user = await User.findOne({ username: req.body.username })
    user.cart = []
    await user.save()
    res.send()
    }
    catch(err){
        console.log(err)
    }
}

module.exports.orders_get = async (req, res) => {
    try{
    let user = await User.findOne({username: req.params.username})
    let items = []
    let order_history = []
    for (let i = 0; i < user.orderHistory.length; i++) {
        let order = await Order.findById(user.orderHistory[i])
        order.items.map(item => {
            items.push({
                id: item._id,
                item: item.title,
                qty: item.qty
            })
        })
        order_history.push({
            id: order._id,
            time: order._id.getTimestamp(),
            items: items,
            total: order.total
        })
        items = []
    }
    res.send(order_history)
    }
    catch(err){
        console.log(err)
    }
}

module.exports.order_post = async (req, res) => {
    try{
        let order = await new Order(req.body).save()
        let user = await User.findOne({ username: req.body.username })
        user.orderHistory.push(order._id)
        await user.save()
        for (let i = 0; i < order.items.length; i++){
            let item = await Item.findById(order.items[i].item)
            let count = item.numBought + order.items[i].qty
            item.numBought = count
            await item.save()
        }
        res.send()
    }
    catch(err){
        console.log(err)
    }
}

module.exports.editIntro = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.params.username });
        user.intro = req.body.intro;
        user.save();
        res.send();
    } catch (err) {
        console.log(err)
    }
}

module.exports.followings_get = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.params.username })
        let followings = []
        for (let i = 0; i < user.followings.length; i++){
            let target = await User.findOne({username: user.followings[i]})
            followings.push({
                username: target.username,
                profilePic: target.profilePic,
                intro: target.intro
            })
        }
        res.send(followings)
    } catch (err) {
        console.log(err);
    }
}

module.exports.followers_get = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.params.username })
        let followers = []
        for (let i = 0; i < user.followers.length; i++){
            let target = await User.findOne({username: user.followers[i]})
            followers.push({
                username: target.username,
                profilePic: target.profilePic,
                intro: target.intro
            })
        }
        res.send(followers)
    } catch (err) {
        console.log(err);
    }
}


module.exports.collection_post_get = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.params.username })
        let posts = []
        for (let i = 0; i < user.postCollections.length; i++){
            try{
                let target = await Post.findById(user.postCollections[i])
                posts.push({
                    _id: target._id, 
                    title: target.title,
                    body: target.body,
                    images: target.images,
                    numLikes: target.numLikes,
                    numCollects: target.numCollects
                })
            }catch{
                console.log("db not found")
            }
        }
        res.send(posts)
    } catch (err) {
        console.log(err);
    }
}


module.exports.collection_item_get = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.params.username })
        let items = []
        for (let i = 0; i < user.itemCollections.length; i++){
            try{
                let target = await Item.findById(user.itemCollections[i])
                items.push({
                    _id: target._id,
                    title: target.title,
                    body: target.body,
                    images: target.images,
                    numBought: target.numBought,
                    numCollects: target.numCollects
                })
            }catch{
                console.log("db not found")
            }
        }
        res.send(items)
    } catch (err) {
        console.log(err);
    }
}
