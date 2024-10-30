const postController = require('../controllers/postController');
const express = require('express');
const router = express.Router();


router.route('/')
    .post(postController.createPost)
    .get(postController.getAllPosts);

router.route('/:id')
    .get(postController.getPostById)
    .delete(postController.deletePost)
    .put(postController.updatePost);    

module.exports = router
