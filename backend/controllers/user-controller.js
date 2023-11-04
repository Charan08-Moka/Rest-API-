
import User from "../model/User.js";
import bcrypt from 'bcryptjs';
import Blog from "../model/Blog.js"; // heheh

export const getAllUser = async(req,res,next)=>{ // middleware funcns req,res,next 
    let users;
    try{  // always use the try and catch in databases if db doesnt funcn properly it will catch the error 
        users = await User.find();  // .find() is the funcn of the monggose 
    } catch (err){
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({message: "No Users Found"}); // if no users are there in the database return this 
    }
    return res.status(200).json({ users }); // is there then return the users 
};

export const signup = async(req,res,next)=>{
    const{name,email,password} = req.body;

    let existingUser; // is the user already exists i.e., we r defining the existing user 
    try{
        existingUser = await User.findOne({email}); // findOne() finds only one record from the database 
    } catch (err){
        return console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message: "User Already Exist! Login Instead"}); // user is available 
    }
    const hashedPassword = bcrypt.hashSync(password);


    const user = new User({ // if the user is not available we r sending the new user here 
        name,
        email,
        password: hashedPassword,
        blogs:[], // this will be given during the relation of users and blogs 
    });
        // const hashedPassword = bcrypt.hashSync(password);

    try{
        await user.save(); // await becoz its a asynchronous task and saving the user using .save() funcn from mongoose 
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({user});

};

export const login = async(req,res,next)=>{
    const {email,password} = req.body; // for logging in name is not required 

    let existingUser; // is the user already exists i.e., we r defining the existing user --> this is the checksum validity
    try{
        existingUser = await User.findOne({email}); // findOne() finds only one record from the database 
    } catch (err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(404)
        .json({message: "User could not be Found using this Email"}); // user is available 
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);  // this is synchronously compare the password with the password in db
    if(!isPasswordCorrect){ // if the typed passwd is not matcched with the passwd that is there in db return the Incrct passwd
        return res.status(404).json({message: "Incorrect Password"});
    }
    return res.status(200).json({message:"Login Successful"}); // if the password is crct 

};

