import express from 'express';
import { getUser, login, registerUser } from '../controllers/UserController.js';


const userRoute=express.Router();

userRoute.post('/newUser', registerUser)
userRoute.post('/loginUser', login)
userRoute.get('/getUser/:id', getUser)


export default userRoute;