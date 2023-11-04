import Blog from "../model/Blog.js";
import mongoose from "mongoose";
import User from "../model/User.js"; // hehe

export const getAllBlogs = async(req,res,next)=>{
    let blogs;
    try{
        blogs = await Blog.find(); // await becoz of hhtp tasks 
    } catch (err){
        return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message:"No Blogs Found"}); // blogs are not there 
    }
    return res.status(200).json({ blogs }); // returning the blog array 
};

export const addBlog = async(req,res,next)=>{ // this funcn is for adding blogs 
    const {title,description,image,user} = req.body;
    let existingUser;
    try{
        existingUser = await User.findById(user); // this user field will contain the actual id of the user 
    } catch (err) {
         console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message:"Unable to Find User by this ID"})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user,
    });
    try{
        const session = await mongoose.startSession(); // await becoz its an http task and using the startSession in mongoose 
        session.startTransaction();
        await blog.save({session}); // saving and definig the session -- session is used to save the blog of the user 
        existingUser.blogs.push(blog); // pushing the blogs to this array
        await existingUser.save({session}) 
        await session.commitTransaction();
    } catch (err){
          console.log(err);
         return res.status(500).json({message: err})
    }
    return res.status(200).json({blog}); // return blog when its OK
};

export const updateBlog = async(req,res,next)=>{
    const {title,description} = req.body;
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description,
        });
    } catch (err) {
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"Unable to Update the Blog"})
    }
    return res.status(200).json({blog});
    
};

export const getById = async(req,res,next)=>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id); // finding the blog by id 
    } catch (err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message:"No Blog Found"});
    }
    return res.status(200).json({blog});
};

// controller func to delete a blog 
 export const  deleteBlog = async(req,res,next) => {
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog); // deleting the blog from the array 
        await blog.user.save(); // saving after the deletion from the blog 
    } catch (err) {
         console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"unable to Delete"});
    }
    return res.status(200).json({message:"Deleted Successfully"});
 };

 export const getByUserId = async(req,res,next) => {
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (err) {
        return console.log(err)
    }
    if(!userBlogs){
        return res.status(404).json({message:"No Blogs Found"})
    }
    return res.status(200).json({blogs:userBlogs})
 }