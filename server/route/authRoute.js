

import express from "express"
import { forgotPassword, google, resetPassword, signin, signout, signup } from "../controller/authController.js"


const authRoute = express.Router()


authRoute.post('/sign-up', signup)

authRoute.post('/sign-in' ,signin)

authRoute.post('/google' ,google)

authRoute.post('/sign-out', signout)

authRoute.post('/forgot-password' , forgotPassword)

authRoute.post('/reset-password/:token' ,resetPassword)




export default authRoute 