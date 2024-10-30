const {Category} = require('../models/categoryModel');
const AsyncHandler = require('../middlewares/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

exports.createCategory = AsyncHandler(async (req, res) => {
    const category = await Category.create(req.body);
    if(!category){
        return ApiResponse.error('Failed to create category', 400).send(res);
    }
    return ApiResponse.success('Category created', category,201).send(res);
});

exports.deleleCategory = AsyncHandler(async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if(!category){
        return ApiResponse.error('Category not found', 404).send(res);
    }
    return ApiResponse.success('Category deleted', category,200).send(res);
});

exports.updateCategory = AsyncHandler(async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!category){
        return ApiResponse.error('Category not found', 404).send(res);
    }
    return ApiResponse.success('Category updated', category,200).send(res);
});

exports.getCategoryById = AsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category){
        return ApiResponse.error('Category not found', 404).send(res);
    }
    return ApiResponse.success('Category retrieved', category,200).send(res);
});

exports.getAllCategories = AsyncHandler(async(req,res)=>{
    const categories =await Category.find(req.body);
    if(category.length === 0){
        return ApiResponse.error('No categories found', 404).send(res);
    }return ApiResponse.success('Categories retrieved', category,200).send(res);
});
