const {Comment} = require('../models/commentModel');
const AsyncHandler = require('../middlewares/asyncHandler');
const apiResponse = require('../utils/apiResponse'); 



exports.createComment = AsyncHandler(async (req,res)=>{
    const comment = await Comment.create(req.body);
    if(!comment){
        return apiResponse.err("failed to create Comment", 400).send(res);
    }
    return apiResponse.success('Comment created successfuly', comment, 201).send(res);
});

exports.deleteComment = AsyncHandler(async (req,res)=>{
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if(!comment){
        return apiResponse.err("Failed to delete Comment", 404).send(res);
    }
    return apiResponse.success('Comment deleted successfuly').send(res);
});

exports.updateComment = AsyncHandler(async (req,res)=>{
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!comment){
        return apiResponse.err("Failed to update Comment", 404).send(res);
    }
    return apiResponse.success('Comment updated successfuly', comment).send(res);
});

exports.getCommentById = AsyncHandler(async (req,res)=>{
    const comment = await Comment.findById(req.params.id);
    if(!comment){
        return apiResponse.err("Failed to find Comment", 404).send(res);
    }
    return apiResponse.success('Comment retrieved', comment).send(res);
});

exports.getAllComments = AsyncHandler(async (req,res)=>{
    const comments = await Comment.find();
    if(!comments){
        return apiResponse.err("Failed to find Comments", 404).send(res);
    }
    return apiResponse.success('Comments retrieved', comments).send(res);
});