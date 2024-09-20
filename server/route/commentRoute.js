

import express from "express"
import { createComment, deleteComment, editComment, getComments, getPostComments, likeComment } from "../controller/commentController.js"
import { verifyToken } from "../utils/verifyUser.js"


const  commentRoute = express.Router()


commentRoute.post('/create-comment' ,verifyToken ,createComment)


commentRoute.get('/get-postcomment/:postId' ,getPostComments)


commentRoute.get('/get-comments' ,verifyToken , getComments)


commentRoute.post('/like-comment/:commentId' ,verifyToken ,likeComment)


commentRoute.put('/update-comment/:commentId' ,verifyToken , editComment)


commentRoute.delete('/delete-comment/:commentId' ,verifyToken ,deleteComment)


export default commentRoute