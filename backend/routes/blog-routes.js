import express from 'express';
import { addBlog, deleteBlog, getAllBlogs, getById, getByUserId, updateBlog } from "../controllers/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.put('/update/:id',updateBlog); // updating the blog using the id of that particular blog 
blogRouter.get("/:id",getById); // get reqs to get a blog from this id 
// after giving this we can blog from a id a we can update the blog from a particular id 
blogRouter.delete("/:id",deleteBlog);
blogRouter.get("/user/:id",getByUserId);

export default blogRouter;