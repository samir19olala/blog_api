const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {

} = require('../middlewares/validators/userValidator')

router.route('/')
    .post(userController.createUser)
    .get(userController.getAllUsers);

router.route('/:id')
    .get(userController.getUserById)
    .delete(userController.deleteUser)
    .put(userController.updateUser);  // Update user by id


module.exports = router;