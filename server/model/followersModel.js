

import mongoose from "mongoose";

const followerSchema = new mongoose.Schema(
    {
        followerId:{type:mongoose.Schema.ObjectId , ref:"User"},

        writerId:{type:mongoose.Schema.ObjectId , ref:"User"}
    },
    { timestamps: true}
)

const Follower = mongoose.model("Follower", followerSchema)


export default Follower 