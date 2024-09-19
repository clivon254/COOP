

import express from "express"
import { deleteUser, followWiter, getUser, getUsers, unfollowWriter, updateUser } from "../controller/userController.js"
import { verifyToken } from "../utils/verifyUser.js"



const userRoute = express.Router()



userRoute.get('/get-user/:userId', getUser)


userRoute.get('/get-users', verifyToken, getUsers)


userRoute.put('/update-user/:userId',verifyToken , updateUser)


userRoute.delete('/delete-user/:userId',verifyToken, deleteUser)


userRoute.post('/follow-writer/:userId', verifyToken, followWiter)


userRoute.post('/unfollow-writer/:userId', verifyToken, unfollowWriter)




export default userRoute