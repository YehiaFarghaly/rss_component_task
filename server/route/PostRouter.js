import { Router } from "express";
import { getAllPosts, createPost } from '../controller/PostController.js'

const router = Router();

router.get('/', getAllPosts);

router.post('/', createPost);

export default router;