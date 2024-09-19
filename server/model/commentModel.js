 

import mongoose from "mongoose"


const commentSchema = new mongoose.Schema({

    postId:{type:String , required:true},

    userId:{type:String, required:true},

    content:{type:String, required:true}

},
    {timestamps:true}
)

const Comment = mongoose.model("Comment", commentSchema)

export default Comment 