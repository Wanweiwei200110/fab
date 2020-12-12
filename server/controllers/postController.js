const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const User = require('../models/userModel');
const { compare } = require('bcrypt');

// get all posts
const allPost_get = (req, res) => {
  console.log('get post')
  try{
  Post.find().sort({ createdAt: -1 })
    .then(posts => {
      res.send(posts)
    })
    .catch(err => {
      console.log(err)
    })
  }
  catch(err){
    console.log(err)
  }
}

// get a post
const post_get = async (req, res) => {
  try{
  let post = await Post.findById(req.params.post_id)
  let liked = false
  let collected = false
  let user = await User.findOne({username: req.params.username})
  if (user.postCollections.includes(req.params.post_id)) {
    collected = true
  }
  if (user.likedPosts.includes(req.params.post_id)) {
    liked = true
  }
  res.send({post, liked, collected})
  }
  catch(err){
    console.log(err)
  }
}

const post_author_get = async (req, res) => {
  try{
  let post = await Post.findById(req.params.post_id)
  let target = await User.findOne({username: post.author})
  let following = false
  let user = await User.findOne({username: req.params.username})
  if (user.followings.includes(target.username)) {
    following = true
  }
  
  res.send({
    author: {
      id: target._id,
      profilePic: target.profilePic,
      username: target.username,
      intro: target.intro,
      numFollowers: target.followers.length
    },
    following
  })
  }
  catch(err){
    console.log(err)
  }
  
}

// post new post
const post_post = async (req, res) => {
  try{
  const post = new Post(req.body);
  post.save()
      .then(post => {
        res.send({id: post._id})})
        .catch(err=>{
          console.log(err)
        })
      }
      catch(err){
        console.log(err)
      }
}


// patch request like post
const like_post = async (req, res) =>{
  try{
  let post = await Post.findById(req.params.post_id)
  let user = await User.findOne({username: req.body.username})
  post.numLikes += 1
  user.likedPosts.push(req.params.post_id)
  await post.save()
  await user.save()
  res.send()
  }
  catch(err){
    console.log(err)
  }
}

// patch unlike post
const unlike_post = async (req, res) =>{
  try{
  let post = await Post.findById(req.params.post_id)
  let user = await User.findOne({username: req.body.username})
  post.numLikes -= 1
  user.likedPosts.splice(user.likedPosts.indexOf(req.params.post_id), 1)
  await post.save()
  await user.save()
  res.send()
  }
  catch(err){
    console.log(err)
  }
}


// patch collect post
const collect_post = async (req, res) =>{
  try{
  let post = await Post.findById(req.params.post_id)
  let user = await User.findOne({username: req.body.username})
  post.numCollects += 1
  user.postCollections.push(req.params.post_id)
  await post.save()
  await user.save()
  res.send()
  }
  catch(err){
    console.log(err)
  }
}

// patch uncollect post
const uncollect_post = async (req, res) =>{
  try{
  let post = await Post.findById(req.params.post_id)
  let user = await User.findOne({username: req.body.username})
  post.numCollects -= 1
  user.postCollections.splice(user.postCollections.indexOf(req.params.post_id), 1)
  await post.save()
  await user.save()
  res.send()
  }
  catch(err){
    console.log(err)
  }
}

// add comments
const addComments = (req, res) =>{
  try{
  const newComment = new Comment(req.body)
  newComment.save()
      .then(comment => {
        res.send(comment)
      })
      .catch(err =>{
          console.log(err)
      })
    }
    catch(err){
      console.log(err)
    }
}

// delete comments
const RemoveComments = (req, res) =>{
  try{
  Comment.findByIdAndRemove(req.params.comment_id)
      .then(comment => {
        res.send(comment)
      })
      .catch(err =>{
        console.log(err)
      })
    }
    catch(err){
      console.log(err)
    }
}

// patch upvote comment
const upvoteComment = (req, res) =>{
  try{
  Comment.findById(req.params.comment_id)
      .then(comment =>{
          comment.upvotes += 1
          comment.save()
            .then(comment=>{
              res.send(comment)
            })
            .catch(err=>{
              console.log(err)
            })
      })
      .catch(err=>{
        console.log(err)
      })
    }
    catch(err){
      console.log(err)
    }
}

// patch downvote comment
const downvoteComment = (req, res) =>{
  try{
  Comment.findById(req.params.comment_id)
      .then(comment =>{
          comment.downvotes += 1
          comment.save()
            .then(comment=>{
              res.send(comment)
            })
            .catch(err=>{
              console.log(err)
            })
      })
      .catch(err=>{
        console.log(err)
      })
  }
  catch(err){
    console.log(err)
  }
}

// patch cancel report
const cancelReportPost_patch = (req, res) =>{
  try{
  Post.findById(req.params.comment_id)
    .then(post =>{
      post.reported = false
      post.save()
        .then(post=>{
          res.send(post)
        })
        .catch(err=>{
          console.log(err)
        })
    })
    .catch(err=>{
      console.log(err)
    })
  }
  catch(err){
    console.log(err)
  }
}

// get all report posts
const allReportPost_get = (req, res) =>{
  try{
  Post.find({reported: true})
    .then(posts =>{
      res.send(posts)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  catch(err){
    console.log(err)
  }
}

const pics_patch = async (req, res) => {
  try{
    let post = await Post.findById(req.params.post_id);
    post.images = req.body.urls;
    post.save();
    res.send();
  } catch (err) {
      console.log(err)
  }
}

 
const report_post = async (req, res) => {
  try{
    let post = await Post.findById(req.params.post_id);
    post.reported = true;
    post.save();
    res.send();
  } catch (err) {
    console.log(err)
  }
}

const unreport_post = async (req, res) => {
  try{
    let post = await Post.findById(req.params.post_id);
    post.reported = false;
    post.save();
    res.send();
  } catch (err) {
    console.log(err)
  }
}
 
const delete_post = async (req, res) => {
  try{
    await Post.findByIdAndDelete(req.params.post_id);
    res.send();
  } catch (err) {
    console.log(err);
  }
}

const reportedPost_get = async (req, res) => {
  try {
    let posts = await Post.find({reported: true})
    res.send(posts)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  allPost_get,
  post_get,
  post_post,
  like_post,
  unlike_post,
  collect_post,
  uncollect_post,
  addComments,
  RemoveComments,
  upvoteComment,
  downvoteComment,
  allReportPost_get,
  cancelReportPost_patch,
  pics_patch,
  post_author_get,
  report_post,
  unreport_post,
  delete_post,
  reportedPost_get
}