const {User} = require('../models/userModel');
const AsyncHandler = require('../middlewares/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

exports.createUser = AsyncHandler(async (req, res) => {
    const user = await User.create(req.body);
    if(!user){
        return ApiResponse.error('Failed to create user', 400).send(res);
    }
    return ApiResponse.success('User created', user,201).send(res);
});