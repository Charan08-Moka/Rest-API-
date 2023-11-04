// import mongoose from "mongoose";
import mongoose from "mongoose";
import Blog from "./Blog.js"; // hehe

const Schema = mongoose.Schema; // getting the mongoose schema in Schema variable 

const userSchema = new Schema({
     name:{    // name field of the user 
        type: String, // input type is of string
        required: true // making the name as a required filed 
     },
     email:{  // email filed of the user 
        type: String, // input is of string 
        required: true, // making the name as a required field
        unique: true // email should be unique 
     },
     password:{ // password filed of the user 
        type: String, // input type is of string
        required: true, // making the password as a requires field
        minlength: 6 // password minimum length should be of 6
     },
     blogs: [{type:mongoose.Types.ObjectId,ref:"Blog",required:true}], // array becoz each user can have multiple blogs 

});  // all the above fields will be stored inside the collection 
export default mongoose.model("User", userSchema); // exporting the collection to the mongoDb 
// "User" -> this is the name of the collection that i gave and but it will be stored as "users" in the mongoDb 