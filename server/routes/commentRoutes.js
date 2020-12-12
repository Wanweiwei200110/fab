const express = require('express');
const commentController = require('../controllers/commentController');
const router = express.Router();


router.post('/:id/comment', commentController.comment_post);
router.get('/:id/comments/:username', commentController.comment_get);
router.patch('/:comment_id/comment', commentController.comment_patch);
router.patch('/comment/:comment_id/report', commentController.report_comment)
router.patch('/comment/:comment_id/unreport', commentController.unreport_comment)
router.delete('/comment/:comment_id', commentController.delete_comment)
router.get('/comments/reported', commentController.reportedComment_get);


module.exports = router;