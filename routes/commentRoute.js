const commentRoute = require('../controllers/commentController');
const express = require('express');
const router = express.Router();


router.route('/')
    .post(commentRoute.createComment)
    .get(commentRoute.getAllComments);

router.route('/:id')
    .get(commentRoute.getCommentById)
    .delete(commentRoute.deleteComment)
    .put(commentRoute.updateComment);    

module.exports = router;