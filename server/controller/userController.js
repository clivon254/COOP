
import Follower from "../model/followersModel.js"
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"



export const getUser = async (req,res,next) => {

    const {userId} = req.params

    try
    {
        const user = await User.findById(userId)

        if(!user)
        {
            return next(errorHandler(404, "User not found "))
        }

        const {password, ...rest} = user._doc ;

        res.status(200).json({success:true ,rest})

    }
    catch(error)
    {
        next(error)
    }
    
}


export const getUsers = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "You are not allowed to see the users"))
    }

    try
    {
        const startIndex = parseInt(req.query.startIndex)

        const limit = parseInt(req.query.limit) || 12

        const sortDirection = req.query.sort === 'asc' ? 1 : -1

        const users = await User.find()
                        .sort({createdAt:sortDirection})
                        .skip(startIndex)
                        .limit(limit)

        const usersWithoutPassword = users.map((user) => {

            const {password , ...rest} = user._doc ;

            return rest
        })

        const totalUsers = await User.countDocuments()

        res.status(200).json({success:true ,usersWithoutPassword ,totalUsers})
   
    }
    catch(error)
    {
        next(error)
    }
    
}

 
export const followWiter = async (req,res,next) => {

    try
    {
        const followerId = req.user.id

        const {userId} = req.params

        const checks = await Follower.findOne({followerId})

        if(checks)
        {
            return next(errorHandler(201, "You're already following this writer"))
        }

        const writer = await User.findById(userId)

        const newFollower = await Follower.create({
            followerId,
            writerId:userId
        })

        writer?.followers?.push(newFollower?._id)

        await User.findByIdAndUpdate(userId, writer, {new:true})

        res.status(201).json({success:true ,message:"You're now following writer" + writer?.username})

    }
    catch(error)
    {
        next(error)
    }
    
}


export const unfollowWriter = async (req,res,next) => {

    try
    {
        const followerId = req.user.id 

        const {userId} = req.params

        const follower = await Follower.findOne({followerId})

        if(!follower)
        {
            return next(errorHandler(404 ,"You are not following the writer"))
        }

        await Follower.findByIdAndDelete(follower._id)

        const writer = await User.findById(userId)

        writer?.followers?.pull(follower._id)

        await writer.save()

        res.status(200).json({success:true ,message:`You're no longer following ${writer.username}`})
    }
    catch(error)
    {
        next(error)
    }
    
}


export const updateUser = async (req,res,next) => {

    const {userId} = req.params


    if(userId !== req.user.id)
    {
        return next(errorHandler(403,"you are not allowed to update this user"))
    }

    try
    {
        if(req.body.password)
        {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture,
                }
            },
            {new:true}
        )

        const {password, ...rest} = updatedUser._doc 

        res.status(200).json({success:true ,rest})

    }
    catch(error)
    {
        next(error)
    }
    
}


export const deleteUser = async (req,res,next) => {

    const {userId} = req.params

    if(req.user.id !== userId || !req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to delete the user"))
    }

    try
    {
        await User.findByIdAndDelete(userId)

        res.clearCookie('access_token')

        res.status(200).json({success:true , message:"user deleted successfully "})
    }
    catch(error)
    {
        next(error)
    }
    
}




