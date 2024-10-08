
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
        const {slug} = req.params

        const userId = req.body.userId

        const post = await Post.findOne({slug})
                     .populate({
                        path:"userId",
                     })

        if(userId)
        {
            const existingVeiw = await Veiw.findOne({postId:post._id ,userId})

            if(!existingVeiw)
            {
                const newVeiw = await Veiw.create({
                    userId,
                    postId:post._id
                })
    
                post.veiw.push(newVeiw?._id)
    
                await Post.findByIdAndUpdate(post._id ,post)
            }

            res.status(200).json({success:true, post})

        }
        else
        {
            res.status(200).json({success:true, post})
        }
    

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
        .populate({
            path:"userId"
        })

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
        

        const last5followering = await User.findById(userId).populate({
            path:"followers",
            options:{sort : {_id : -1}},
            perDocumentLimit: 5,
            populate:{
                path:"followerId"
            }
        }) 

        const last5followers = await User.findById(userId)
        .populate({
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


export const getPopularContent = async (req,res,next) => {

    try
    {
        const posts = await Post.aggregate([
            {
                $match:{
                    status:true
                },
            },
            {
                $project:{
                    title:1,
                    slug:1,
                    image:1,
                    category:1,
                    veiw:{ $size :"$veiw" },
                    createdAt:1
                }
            },
            {
                $sort:{veiws: -1}
            },
            {
                $limit:5
            }
        ])

        const writers = await User.aggregate([
            {
                $match:{
                    accountType:{$ne:"user"}
                },
            },
            {
                $project:{
                    username: 1,
                    profilePicture: 1,
                    followers:{ $size : "$followers" }
                }
            },
            {
                $sort:{followers: -1}
            },
            {
                $limit:5
            }
        ])

        res.status(200).json({success:true , posts ,writers})
    }
    catch(error)
    {
        next(error)
    }

}