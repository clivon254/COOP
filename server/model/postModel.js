
import mongoose from "mongoose"

const postSchema = new mongoose.Schema({

    title:{type:String ,required:true},

    slug:{type:String ,required:true ,unique:true},

    description:{type:String ,required:true},

    image:{type:String ,required:true},

    category:{type:String ,required:true},

    veiw:[{type:mongoose.Schema.Types.ObjectId , ref:"Veiw"}],

    userId:[{type:mongoose.Schema.Types.ObjectId , ref:"User"}],

    status:{type:Boolean , default:true}
},
  {timestamps:true}
)


const Post = mongoose.model("Post", postSchema)


export default Post 