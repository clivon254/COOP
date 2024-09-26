

import express from "express"
import { createPost, deletePost, getPopularContent, getPost, getPosts, stats, updatePost } from "../controller/postController.js"
import { verifyToken } from "../utils/verifyUser.js"


const postRoute = express.Router()


postRoute.post("/create-post",verifyToken, createPost)


postRoute.post("/get-post/:slug", getPost)


postRoute.get("/get-posts", getPosts)


postRoute.put("/update-post/:postId/:userId",verifyToken, updatePost)


postRoute.delete("/delete-post/:postId/:userId",verifyToken, deletePost)


postRoute.post("/stats", verifyToken, stats)


postRoute.post("/popular-content",  getPopularContent)





export default postRoute