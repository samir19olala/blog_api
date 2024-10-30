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
