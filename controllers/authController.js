const userModel = require('../models/userModel');
const AsyncHandler = require('../middlewares/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const crypto = require("crypto");
const {sendEmail,sendVerificationEmail} = require('../utils/emailService');

//@desc get register user
//@desc get /api/v1/auth/register
//@access public

exports.registerUser = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    let user = await userModel.User.findOne({email});

    if(user){
        return ApiResponse.success("User already exist ",user,400).send(res);

    }

    user = await userModel.User.create({
        username: username,
        email: email,
        password: password
    });

    const emailVerificationToken = user.generateEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    //envoyer un email verification

    try{
        await sendVerificationEmail(user.email, emailVerificationToken);
        return ApiResponse.error("Error sending verification email",500).send(res);
    }catch(error){
        user.emailVerificationToken = undefined;
        user.emailVerificationTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });

    }

});

exports.verifyEmail =AsyncHandler(async (req,res)=>{
    const [email , opt] = req.body;
    const hashedToken = crypto.creatHash('sha256').update(opt).digest('hex');
    const user = await userModel.User.findOne({
        email,emailVerificationToken:hashedToken,
        emailVerificationTokenExpire: { $gt: Date.now() }
    });

    if(!user){
        return ApiResponse.error("Invalid or expired token",400).send(res);
    }
    //update user mail
    user.isEmailVerified = true,
    user.emailVerifiedToken = undefined,
    user.emailVerificationTokenExpire=undefined,

    setTokenResponse(user,200,res);
});