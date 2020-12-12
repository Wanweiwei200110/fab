const Comment = require('../models/commentModel');
const User = require('../models/userModel');

module.exports.comment_post = async (req, res) => {
    try {
        const {author, content} = req.body;
        const target = req.params.id;
        const comment = await Comment.create({target, author, content});
        res.send(comment);
    } catch (err) {
        console.log(err)
    }
}

module.exports.comment_get = async (req, res) => {
    try {
        var comments = await Comment.find({target: req.params.id})
        let user = await User.findOne({username: req.params.username})
        for (let i = 0; i < comments.length; i++){
            let author = await User.findOne({username: comments[i].author})
            comments[i] = {
                id: comments[i]._id,
                target: comments[i].target, 
                author: comments[i].author, 
                target_type: comments[i].target_type, 
                votes: comments[i].votes, 
                content: comments[i].content,
                reported: comments[i].reported,
                profilePic: author.profilePic,
                upvoted: user.upvoted.includes(comments[i]._id),
                downvoted: user.downvoted.includes(comments[i]._id)
            }
        }
        res.send(comments)
    } catch (err) {
        console.log(err)
    }
}

module.exports.comment_patch = async (req, res) => {
    try {
        let user = await User.findOne({username: req.body.username});
        let comment = await Comment.findById(req.params.comment_id);
        if (req.body.action === 'upvote') { 
            console.log(req.body)
            comment.votes += 1;
            if (req.body.downvoted) {
                user.downvoted.splice(user.downvoted.findIndex(element => element._id === req.params.comment_id), 1)
            } else {
                user.upvoted.push(req.params.comment_id)
            }

        } else if (req.body.action === 'downvote') {
            comment.votes -= 1;
            if (req.body.upvoted) {
                user.upvoted.splice(user.upvoted.findIndex(element => element._id === req.params.comment_id), 1)
            } else {
                user.downvoted.push(req.params.comment_id)
            }
        }
        await user.save()
        await comment.save()
        res.send()
    } catch (err) {
        console.log(err)
    }
}

module.exports.report_comment = async (req, res) => {
    try{
      let comment = await Comment.findById(req.params.comment_id);
      comment.reported = true;
      comment.save();
      res.send();
    } catch (err) {
      console.log(err)
    }
}
  
module.exports.unreport_comment = async (req, res) => {
    try{
        let comment = await Comment.findById(req.params.comment_id);
        comment.reported = false;
        comment.save();
        res.send();
    } catch (err) {
        console.log(err)
    }
}

module.exports.delete_comment = async (req, res) => {
    try{
        await Comment.findByIdAndDelete(req.params.comment_id);
        res.send();
    } catch (err) {
        console.log(err);
    }
}

module.exports.reportedComment_get = async (req, res) => {
    try {
        let comments = await Comment.find({reported: true})
        res.send(comments)
    } catch (err) {
        console.log(err)
    }
}