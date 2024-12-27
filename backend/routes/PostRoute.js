import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { commentPost, getAllPosts, likePost, newPost} from '../controllers/PostController.js';
import upload from '../config/multer.js';


const postRoute = express.Router()


postRoute.post('/newPost', protect,upload.single('image'), newPost)
postRoute.get('/getAllPosts', getAllPosts)
postRoute.put('/:id/likePost',protect, likePost)
postRoute.put('/:id/commentPost',protect, commentPost)

export default postRoute;