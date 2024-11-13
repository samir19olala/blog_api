const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please add a category name"],
            unique:[true,"Category name already exists"],
            trim:true,
            minlength:[2,"Category be at least 2 characters"],
            maxlength:[50,"Category be at most 50 characters"]
        },
        description:{
            type:String,
            trim:true,
            minlength:[2,"Description must be at least 2 caracters"],
            maxlength:[500,"Description must be at most 500 caracters"]
        }
    },
    {timestamps:true}
);

const Category = mongoose.model('Category', categorySchema);
module.exports = {Category,categorySchema};