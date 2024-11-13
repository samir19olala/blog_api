const mongoose = require('mongoose');
const {Category, CategorySchema} = require('./categoryModel');
const {User, userSchema} = require('./userModel');
const postSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Please add Post\' title"],
            trim:true,
            minlength:[2,"Title be at least 2 characters"],
            maxlength:[100,"Title be at most 100 characters"]
        },
        content:{
            type:String,
            required:[true,"Please add post content"],
            trim:true,
            minlength:[3,"Content must be at least 3 caracteres"],
            maxlength:[10000,"Content can not be more than 10000 characters"]
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref:User,
            required:[true,"Author is required"],
        },
        cathegory:{
            type: mongoose.Schema.Types.ObjectId,
            ref:Category,
            required:[true,"Category is required"],
            },
        image:{
            type:String,
        },
        views:{
            type:Number,
            default:0,
        },
        likedCount:{
            type:Number,
            default:0,
        },
        commentsCount:{
            type:Number,
            default:0,
        },

        popularityScore:{
            type:Number,
            default:0,
        }
    },
    {timestamps:true}   

);

//method calculte popularity score
postSchema.methods.calculatePopularityScore = function(){
    this.popularityScore = this.views * 0.5 + this.likedCount *0.3 + this.commentsCount *0.2;
}

//middleware to calculate popularity score before saving
postSchema.pre('save', function(next){
    this.calculatePopularityScore();
    next();
});

const Post = mongoose.model('Post', postSchema);
module.exports = {Post, postSchema};
