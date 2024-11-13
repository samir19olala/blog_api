const mongoose = require('mongoose');
const {User, userSchema} = require('./userModel');
const {Post, postSchema} = require('./postModel');

const commentSchema = new mongoose.Schema(
    {
        content:{
            type:String,
            required:[true,"Please add a content"],
            trim:true,
            minlength:[2,"Comment be at least 2 characters"],
            maxlength:[1000,"Comment be at most 1000 characters"]
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref:User,
            required:true,
        },
        post:{
            type: mongoose.Schema.Types.ObjectId,
            ref:Post,
            required:true,
        },
    },
    {timestamps:true}
);


//middleware to update post comments count

// Middleware pour mettre à jour le compteur après la création d'un commentaire
commentSchema.post("save", async function () {
    try {
      const Post = this.model("Post");
      const post = await Post.findByIdAndUpdate(
        this.post,
        { $inc: { commentCount: 1 } },
        { new: true }
      );
  
      // Le middleware pre('save') du Post s'occupera de recalculer le score de popularité
      await post.save();
    } catch (err) {
      console.error("Error updating comment count:", err);
    }
  });
  
  // Middleware pour mettre à jour le compteur après la suppression d'un commentaire
  commentSchema.post("remove", async function () {
    try {
      const Post = this.model("Post");
      const post = await Post.findByIdAndUpdate(
        this.post,
        { $inc: { commentsSchema: -1 } },
        { new: true }
      );
  
      // Le middleware pre('save') du Post s'occupera de recalculer le score de popularité
      await post.save();
    } catch (err) {
      console.error("Error updating comment count:", err);
    }
  });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = {Comment, commentSchema};