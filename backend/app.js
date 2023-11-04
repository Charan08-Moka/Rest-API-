import express from 'express'; // importing express 
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes.js';
import router from './routes/user-routes.js';


const app = express(); // express js will be giving its functionalities to the app variable 
app.use(express.json()); // this will parse the all of the data into the json format 
app.use("/api/user",router); // this will work in /api/user i.e., all the routes work under this route 
app.use("/api/blog",blogRouter);

mongoose
.connect('mongodb+srv://admin:charan08@cluster0.tjz4a2d.mongodb.net/Blog?retryWrites=true&w=majority')
.then(()=>app.listen(5000))
.then(()=> console.log("Connected TO Database and Listening To Localhost 5000"))
.catch((err)=>console.log(err)); // connecting our code to the mongodb using mongoose on port number 5000 and if any error occur 
// catching the error here and using .catch





