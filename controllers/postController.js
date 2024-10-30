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
