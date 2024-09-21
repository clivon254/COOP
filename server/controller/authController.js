
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"



export const signup = async  (req,res,next) => {

    const {username ,email ,password} = req.body

    if(!username || !email || !password || username === '' || email === '' || password === '')
    {
        next(errorHandler(400 ,'All feilds are required'))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        email,
        password:hashedPassword
    })

    try
    {
        await newUser.save()

        res.status(200).json({success:true ,message:"signed up successfully"})
    }
    catch(error)
    {
        next(error)
    }

}


export const signin = async (req,res,next) => {

    const {password,email} = req.body

    if(!email || !password || email === "" || password === '')
    {
        return next(errorHandler(400, "All feilds are required"))
    }

    try
    {
        const validUser = await User.findOne({email})

        if(!validUser)
        {
            return next(errorHandler(404 , "User not found"))
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password)

        if(!validPassword)
        {
            return next(errorHandler(400,"Invalid password"))
        }

        const token = jwt.sign(
            {
                id:validUser.id,
                isAdmin:validUser.isAdmin,
                accountType:validUser.accountType
            },
            process.env.JWT_SECRETE
        )

        const {password:pass, ...rest} = validUser._doc 

        res.status(200)
            .cookie('access_token',token ,{httpOnly :true})
            .json({success:true ,rest})

    }
    catch(error)
    {
        next(error)
    }

}


export const google = async (req,res,next) => {

    const {email,name,googlephotoUrl} = req.body ;

    try
    {
        const user = await User.findOne({email})

        if(user)
        {
            const token = jwt.sign(
                {
                    id:user.id,
                    isAdmin:user.isAdmin,
                    accountType:user.accountType
                },
                process.env.JWT_SECRETE
            )
    
            const {password:pass, ...rest} = user._doc 
    
            res.status(200)
                .cookie('access_token',token ,{httpOnly :true})
                .json({success:true ,rest})
        }
        else
        {
            const generatedPassword = Math.random().toString(36).slice(-8) +
                                      Math.random().toString(36).slice(-8) 

            const hashedPassword = bcryptjs.hashSync(generatedPassword ,10)

            const newUser = new User({
                username:name.toLowerCase().split(' ').join('') + Math.random().toString(36).slice(-8),
                email,
                password:hashedPassword,
                profilePicture:googlephotoUrl
            })

            await newUser.save()

            const token = jwt.sign(
                {
                    id:newUser.id,
                    isAdmin:newUser.isAdmin,
                    accountType:newUser.accountType
                },
                process.env.JWT_SECRETE
            )
    
            const {password:pass, ...rest} = newUser._doc 
    
            res.status(200)
                .cookie('access_token',token ,{httpOnly :true})
                .json({success:true ,rest})

        }

    }
    catch(error)
    {
        next(error)
    }

}


export const signout = async (req,res,next) => {

    try
    {
        res.clearCookie('access_token')
            .status(200)
            .json({success:true ,message:"User has been signed out"})
    }
    catch(error)
    {
        next(error)
    }
}


export const forgotPassword = async (req,res,next) => {

    const {email} = req.body ;

    try
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return next(errorHandler(404, "user not found"))
        }

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRETE,
            {expiresIn:'1h'}
        )

        var transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.AUTH_USER,
                pass:process.env.AUTH_PASS
            }
        })

        var mailOptions = {
            from:"COOP ICT support",
            to:user.email,
            subject:"Reset Password",
            text:`Click on this to reset your password: http://localhost:5174/reset-password/${token}`
        }

        transporter.sendMail(mailOptions ,(error,info) => {

            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log("Email sent" + info.response)
            }
        })

        res.status(200).json({success:true ,message:"Link sent to your email successfully"})

    }
    catch(error)
    {
        next(error)
    }

}


export const resetPassword = async (req,res,next) => {

    const {token} = req.params ;

    const {password ,confirmPassword} = req.body

    try
    {
        const decodedToken = jwt.verify(token , process.env.JWT_SECRETE)

        const user = await User.findById(decodedToken.id)

        if(!user)
        {
            return next(errorHandler(404,"user not found"))
        }

        if(password !== confirmPassword)
        {
            return next(errorHandler,(400,"password and confirmPassord must be the same"))
        }

        const hashedPassword = bcryptjs.hashSync(password ,10)

        user.password = hashedPassword;

        await user.save()

        res.status(200).json({success:true , message:"password successfully reset"})

    }
    catch(error)
    {
        next(error)
    }

}


