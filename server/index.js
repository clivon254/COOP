
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"
import mongoose from "mongoose"
import authRoute from "./route/authRoute.js"
import userRoute from "./route/userRoute.js"
import postRoute from "./route/postRoute.js"
import commentRoute from "./route/commentRoute.js"



const app = express()

const PORT = process.env.PORT 


app.use(cors({
    origin: ['https://coop-ul88.onrender.com', 'https://coop-ul88.onrender.com'],
    credentials: true
  }))

app.use(express.json())

app.use(cookieParser())


// db connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log(err))



// ROUTE
app.use('/api/auth', authRoute)


app.use("/api/user", userRoute)


app.use("/api/post", postRoute)


app.use('/api/comment' ,commentRoute)



// api
app.get('/', (req,res) => {

    res.send('Hello Coop')

})



// listening
app.listen(PORT ,(err) => {

    if(!err)
    {
        console.log(`server is running on port ${PORT}`)
    }

})



app.use((err,req,res,next) => {

    const statusCode = err.statusCode || 500 ;

    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({success:false , message})

})
