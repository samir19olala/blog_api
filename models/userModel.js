const mongoose= require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String, 
            required:true, 
            trim:true},
                
        email:{
            type:String,
            required:true, 
            unique:true,
            lowercase:true,
            trim:true,
            match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },
        password:{
            type:String,
            required:true,
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