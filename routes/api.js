import express from 'express'
import AuthController from '../controllers/AuthController.js'
import PostController from '../controllers/PostController.js'
import Post from '../models/post.js'
import authMiddleware from '../middlewares/Authentication.js'
const router = express.Router()

router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.login)
router.post('/posts/create', PostController.createPost)
router.get('/posts/all', PostController.getAllposts)
router.get('/post/:postId', PostController.getSinglePost)

export default router