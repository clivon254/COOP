
import Post from "../model/postModel.js"
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

    if(!req.user.isAdmin || req.user.id !== req.params.userId || req.user.accountType !== "writer")
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