


import mongoose from "mongoose"

const veiwSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId , ref:"User"},

        postId:{type:mongoose.Schema.Types.ObjectId , ref:"Post"}
    },
    {timestamps:true}
)

const Veiw= mongoose.model("Veiw", veiwSchema)

export default Veiw 