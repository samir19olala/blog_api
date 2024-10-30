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


exports.deleteUser = AsyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        return ApiResponse.error('Failed to delete user', 404).send(res);
    }
    return ApiResponse.success('User deleted').send(res);
});


exports.updateUser = AsyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!user){
        return ApiResponse.error('Failed to update user', 404).send(res);
    }
    return ApiResponse.success('User updated', user).send(res);
});

exports.getUserById = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return ApiResponse.error('Failed to find user', 404).send(res);
    }
    return ApiResponse.success('User retrieved', user).send(res);
});

exports.getAllUsers = AsyncHandler(async (req, res) => {
    const users = await User.find();
    if(!users){
        return ApiResponse.error('Failed to find users', 404).send(res);
    }
    return ApiResponse.success('Users retrieved', users).send(res);
});
