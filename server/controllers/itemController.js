const Item = require('../models/itemModel');
const User = require('../models/userModel');

// get all items
const allItem_get = (req, res) => {
  try {
    Item.find().sort({ createdAt: -1 })
      .then(items => {
        res.send(items)
      })
      .catch(err => {
        console.log(err)
      })
  }
  catch (err) {
    console.log(err)
  }
}

// get a item
const item_get = async (req, res) => {
  try {
    let item = await Item.findById(req.params.item_id)
    let inCart = false
    let collected = false
    console.log(req.params.username)
    let user = await User.findOne({ username: req.params.username })
    if (user.itemCollections.includes(req.params.item_id)) {
      collected = true
    }
    if (user.cart.some(element => element.item === req.params.item_id)) {
      inCart = true
    }
    res.send({ item, collected, inCart })
  }
  catch (err) {
    console.log(err)
  }
}

// create new item
const item_post = (req, res) => {
  try {
    const item = new Item(req.body);
    item.save()
      .then(item => {
        res.send({ id: item._id })
      })
  }
  catch (err) {
    console.log(err)
  }
}

// collect item
const collect_item = async (req, res) => {
  try {
    let item = await Item.findById(req.params.item_id)
    let user = await User.findOne({ username: req.body.username })
    item.numCollects += 1
    user.itemCollections.push(req.params.item_id)
    await item.save()
    await user.save()
    res.send()
  }
  catch (err) {
    console.log(err)
  }
}

// uncollect item
const uncollect_item = async (req, res) => {
  try {
    let item = await Item.findById(req.params.item_id)
    let user = await User.findOne({ username: req.body.username })
    item.numCollects -= 1
    user.itemCollections.splice(user.itemCollections.indexOf(req.params.item_id), 1)
    await item.save()
    await user.save()
    res.send()
  }
  catch (err) {
    console.log(err)
  }
}


// add comments
const addComment = (req, res) => {
  try {
    const newComment = new Comment(req.body)
    newComment.save()
      .then(comment => {
        res.send(comment)
      })
      .catch(err => {
        console.log(err)
      })
  }
  catch (err) {
    console.log(err)
  }
}


const pics_patch = async (req, res) => {
  try {
    let item = await Item.findById(req.params.item_id);
    item.images = req.body.urls;
    item.save();
    res.send();
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  allItem_get,
  item_get,
  item_post,
  collect_item,
  uncollect_item,
  addComment,
  pics_patch
}