const dotenv = require('dotenv');
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/db');
const categoryRoute = require('./routes/categoryRoute');
const hostRoute = require('./routes/hostRoute');
const commentRoute = require('./routes/commentRoute');
const postRoute = require('./routes/postRoute');

 // Connect to MongoDB
dotenv.config(
    {path: './config/config.env'}
);
connectDB()
// await connectDB().catch(err => console.error(err));

const app = express();
//body parser
app.use(express.json());
app.use(express.static('public'));

//gloabl management middelware errors

// app.get((req,res)=>{
//     if(req.url ==='/'){
//         res.send("<p>Hello world </p>");
//     }
// })
app.use(errorHandler);

//Mount routers
app.use("/api/v1/categories",categoryRoute);
app.use("/api/v1/users", hostRoute);
app.use("/api/v1/posts",postRoute);
app.use("/api/v1/comments",commentRoute);

module.exports = app;   
