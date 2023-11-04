import mongoose from "mongoose";
import User from "./User.js"; // hehe 

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Types.ObjectId, // specifying the id of the obj here 
        ref:"User", // each blog having only one user 
        required: true,
    },
});

export default mongoose.model("Blog",blogSchema);