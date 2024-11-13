const mongoose= require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String, 
            required:[true,"Please add a User name"], 
            trim:true,
            unique:[true,"Username already exists"],
            minlength:[2,"Username be at least 2 characters"],
            maxlength:[50,"Username be at most 50 characters"],
        },
                
        email:{
            type:String,
            required:[true,"Please add email"], 
            unique:[true,"Email already exists"],
            lowercase:true,
            trim:true,
            match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },
        password:{
            type:String,
            required:[true,"Please add password"],
            minlength:8,
            select:false
        },

        role:{
            type:String,
            enum:['user', 'admin'],
            default:'user'
            },
        avatar:String,
        },

        {timestamps:true}
);

const User = mongoose.model('User', userSchema);
module.exports = {User, userSchema};