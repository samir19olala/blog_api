const mongoose = require('mongoose');
const {Cathegory, CathegorySchema} = require('./categoryModel');
const {User, userSchema} = require('./userModel');
const postSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
        },
        content:{
            type:String,
            required:true,
            trim:true,
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref:User,
            required:true,
        },
        cathegory:{
            type: mongoose.Schema.Types.ObjectId,
            ref:Cathegory,
            required:true,
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
