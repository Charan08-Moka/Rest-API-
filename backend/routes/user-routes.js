import express from 'express';
import { getAllUser, login, signup } from '../controllers/user-controller.js';


// import { getAllUser } from "../controllers/user-controller"; // importing the getAllUser from the user-controller 

const router = express.Router(); // express.Router provides the all of its functionalities to router named variable 

router.get("/", getAllUser);
router.post("/signup",signup);
router.post("/login",login);
export default router;
