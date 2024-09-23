
import mongoose from "mongoose"
import Follower from "../model/followersModel.js"
import Post from "../model/postModel.js"
import User from "../model/userModel.js"
import Veiw from "../model/veiwModel.js"
import { errorHandler } from "../utils/error.js"



export const createPost = async (req,res,next) => {

    if(!req.user.isAdmin || req.user.accountType !== "writer")
    {
        return next(errorHandler(403, "You are not allowed to create post"))
    } 

   const {title,description,image,category} = req.body

    if(!title || !description || !image || !category)
    {
        return next(errorHandler(400, "please fill all the fields required"))
    }

    try
    {
        const slug = req.body.title
                        .split(' ')
                        .join('-')
                        .toLowerCase()
                        .replace(/[^a-zA-Z0-9-]/g, '')

        const newPost = new Post({
            title,
            slug,
            description,
            image,
            category,
            userId:req.user.id
        })

        await newPost.save()

        res.status(200).json({success:true ,newPost})
    }
    catch(error)
    {
        next(error)
    }

}

export const getPost = async (req,res,next) => {

    try
    {
        const {postId} = req.params

        const userId = req.user.id

        const post = await Post.findById(postId)
                     .populate({
                        path:"userId",
                     })

        const existingVeiw = await Veiw.findOne({postId ,userId})
        
        if(!existingVeiw)
        {
            const newVeiw = await Veiw.create({
                userId:post?.userId,
                post:postId
           })

           post.veiw.push(newVeiw?._id)

           await Post.findByIdAndUpdate(postId ,post)
        }
    

       res.status(200).json({success:true, post})

    }
    catch(error)
    {
        next(error)
    }

}

export const getPosts = async (req,res,next) => {

    try
    {
        const startIndex = parseInt(req.query.startIndex)

        const limit = parseInt(req.query.limit) || 12

        const sortDirection = req.query.order === "asc" ? 1 : -1

        const posts  = await Post.find({
            ...(req.query.userId && {userId : req.query.userId}),
            ...(req.query.category && {category : req.query.category}),
            ...(req.query.slug && {slug : req.query.slug}),
            ...(req.query.postId && {_id : req.query.postId}),
            ...(req.query.searchTerm && {
                $or:[
                    {title:{$regex:req.query.searchTerm,$options:'i'}},
                    {content:{$regex:req.query.searchTerm,$options:'i'}}
                ]
            }),
        })
        .sort({updatedAt:sortDirection})
        .skip(startIndex)
        .limit(limit)

        const totalPosts = await Post.countDocuments()

        res.status(200).json({success:true ,posts ,totalPosts})

    }
    catch(error)
    {
        next(error)
    }

}

export const updatePost = async (req,res,next) => {

    if(!req.user.isAdmin || req.user.id !== req.params.userId)
    {
        return next(errorHandler(403, 'You are not allowed to update this post'))
    }

    try
    {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set:{
                    title:req.body.title,
                    description:req.body.description,
                    category:req.body.category,
                    image:req.body.image
                }
            },
            {new:true}
        )

        res.status(200).json({ success:true ,updatedPost})
    }
    catch(error)
    {
        next(error)
    }

}

export const deletePost = async (req,res,next) => {

    if(!req.user.isAdmin || req.user.id !== req.params.userId )
    {
        return(next(errorHandler(403,"You are not allowed to post")))
    }

    try
    {
        await Post.findByIdAndDelete(req.params.postId)

        res.status(200).json({success:true , message:"The post has been deleted"})

    }
    catch(error)
    {
        next(error)
    }

}


export const stats = async (req,res,next) => {

    try
    {
        const {query} = req.query 

        const userId = req.user.id 

        const numofDays = Number(query) || 28 

        const currentDate = new Date()

        const startDate = new Date()

        startDate.setDate(currentDate.getDate() - numofDays)

        // Admin
        const totalPostsAdmin = await Post.find({}).countDocuments()


        const totalUsersAdmin = await User.find({}).countDocuments()


        const totalWritersAdmin = await User.find({
            accountType:"writer"
        }).countDocuments()


        const totalVeiwsAdmin = await Veiw.find({
            createdAt:{ $gte: startDate , $lte:currentDate}
        }).countDocuments()


        const totalFollowersAdmin = await Follower.find({
            createdAt:{ $gte: startDate , $lte:currentDate}
        }).countDocuments()


        const last5postsAdmin = await Post.find({}).limit(5).sort({_id: -1})


        const veiwStatsAdmin = await Veiw.aggregate([
            {
                $match:{
                    createdAt:{ $gte: startDate , $lte:currentDate}
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString: { format : "%Y-%m-%d", date:"$createdAt"}
                    },
                    Total: { $sum: 1 }
                }
            },
            { $sort: {_id: 1 } }
        ])
                   
        
        const followerStatsAdmin = await Follower.aggregate([
            {
                $match:{
                    createdAt:{ $gte: startDate , $lte:currentDate}
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString: { format : "%Y-%m-%d", date:"$createdAt"}
                    },
                    Total: { $sum: 1 }
                }
            },
            { $sort: {_id: 1 } }
        ])

        const last5followersAdmin = await Follower.find().populate({
            path:"followerId",
            options:{sort : {_id : -1}},
            perDocumentLimit: 5
        }) 

        // witer posts
        const totalPosts = await Post.find({userId:userId}).countDocuments()


        const totalFollowers = await Follower.find({writerId:userId}).countDocuments()
        

        const last5followers = await User.findById(userId).populate({
            path:"followers",
            options:{sort : {_id : -1}},
            perDocumentLimit: 5,
            populate:{
                path:"followerId"
            }
        }) 

        
        const last5posts = await Post.find({userId:userId}).limit(5).sort({_id: -1})


        const veiwStats = await Veiw.aggregate([
            {
                $match:{
                    userId: new mongoose.Types.ObjectId(userId),
                    createdAt:{ $gte: startDate , $lte:currentDate}
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString: { format : "%Y-%m-%d", date:"$createdAt"}
                    },
                    Total: { $sum: 1 }
                }
            },
            { $sort: {_id: 1 } }
        ])

        
        const followerStats = await Follower.aggregate([
            {
                $match:{
                    writerId: new mongoose.Types.ObjectId(userId),
                    createdAt:{ $gte: startDate , $lte:currentDate}
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString: { format : "%Y-%m-%d", date:"$createdAt"}
                    },
                    Total: { $sum: 1 }
                }
            },
            { $sort: {_id: 1 } }
        ])


        res.status(200)
            .json({ success:true ,
                    totalFollowersAdmin,
                    totalPostsAdmin,
                    totalUsersAdmin,
                    totalWritersAdmin,
                    totalVeiwsAdmin,
                    last5followersAdmin,
                    last5postsAdmin,
                    veiwStatsAdmin,
                    followerStatsAdmin,
                    totalFollowers,
                    totalPosts,
                    veiwStats,
                    followerStats,
                    last5followers,
                    last5posts
            })

    }
    catch(error)
    {
        next(error)
    }

}