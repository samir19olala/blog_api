const commentRoute = require('../controllers/commentController');
const express = require('express');
const router = express.Router();


router.route('/').post(commentRoute.createComment);

module.exports = router;