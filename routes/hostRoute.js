const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {registerUser} = require('../controllers/authController')
const { 
    validateUserRegistration,

} = require('../middlewares/validators/authValidator.js')




router.route('/')
    .post(validateUserRegistration,userController)
    .get(userController.getAllUsers);

router.route('/:id')
    .get(userController.getUserById)
    .delete(userController.deleteUser)
    .put(userController.updateUser);  // Update user by id


module.exports = router;