const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


router.route('/')
    .post(categoryController.createCategory)
    .get(categoryController.getAllCategories);

router.route('/:id')
    .get(categoryController.getCategoryById)
    .delete(categoryController.deleleCategory)
    .put(categoryController.updateCategory);

module.exports = router;