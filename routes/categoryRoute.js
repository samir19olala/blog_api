const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


router.route('/').post(categoryController.createCategory);
router.route('/').get(categoryController.getAllCategories);
router.route('/').put(categoryController.getCategoryById);
router.route('/').delete(categoryController.deleleCategory);

module.exports = router;