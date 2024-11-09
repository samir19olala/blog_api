const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const {
    validateCategoryDelete,
    validateCategoryCreate,
    validateCategoryGet,
    validateCategoryUpdate,
} = require('../middlewares/validators/categoryValidator')

router.route('/')
    .post(validateCategoryCreate,categoryController.createCategory)
    .get(categoryController.getAllCategories);

router.route('/:id')
    .get(validateCategoryGet,categoryController.getCategoryById)
    .delete(validateCategoryDelete,categoryController.deleleCategory)
    .put(validateCategoryUpdate,categoryController.updateCategory);

module.exports = router;