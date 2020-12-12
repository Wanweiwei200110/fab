const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();


router.get('/forum', postController.allPost_get)
router.post('/forum', postController.post_post)
router.get('/forum/:post_id/:username', postController.post_get)
router.get('/forum/:post_id/author/:username', postController.post_author_get)
router.patch('/forum/:post_id/pics', postController.pics_patch)
router.patch('/forum/:post_id/like', postController.like_post)
router.patch('/forum/:post_id/unlike', postController.unlike_post)
router.patch('/forum/:post_id/collect', postController.collect_post)
router.patch('/forum/:post_id/uncollect', postController.uncollect_post)
router.patch('/forum/:post_id/report', postController.report_post)
router.patch('/forum/:post_id/unreport', postController.unreport_post)
router.delete('/forum/:post_id', postController.delete_post)
router.get('/forum/reported', postController.reportedPost_get);



module.exports = router