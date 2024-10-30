const postController = require('../controllers/postController');
const express = require('express');
const router = express.Router();


router.route('/').post(postController.createPost);

module.exports = router
