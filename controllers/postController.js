const {Post} = require('../models/postModel');
const AsyncHandler = require('../middlewares/asyncHandler');
const apiResponse = require('../utils/apiResponse');


exports.createPost = AsyncHandler( async (req,res)=>{
    const post = Post.create(req.body);
    if(!post){
        return apiResponse.err('Failed to create Post', 400).send(res);
    }
    return apiResponse.success('Post created successfully',post,201).send(res);
});


exports.deletePost = AsyncHandler(async (req,res)=>{
    const post = await Post.findByIdAndDelete(req.params.id);
    if(!post){
        return apiResponse.err('Failed to delete Post', 404).send(res);
    }
    return apiResponse.success('Post deleted successfully').send(res);
});

exports.updatePost = AsyncHandler(async (req,res)=>{
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!post){
        return apiResponse.err('Failed to update Post', 404).send(res);
    }
    return apiResponse.success('Post updated successfully', post).send(res);
});

exports.getPostById = AsyncHandler(async (req,res)=>{
    const post = await Post.findById(req.params.id);
    if(!post){
        return apiResponse.err('Failed to find Post', 404).send(res);
    }
    return apiResponse.success('Post retrieved', post).send(res);
});

exports.getAllPosts = AsyncHandler(async (req,res)=>{
    const posts = await Post.find();
    if(!posts){
        return apiResponse.err('Failed to find Posts', 404).send(res);
    }
    return apiResponse.success('Posts retrieved', posts).send(res);
});