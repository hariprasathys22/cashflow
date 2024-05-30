const express = require("express")
const dotenv = require("dotenv")

const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
dotenv.config()
const userRouter = require("./routes/user")

const app = express();

const port = process.env.PORT || 8000

app.use(express.json())

// app.use(cors({
//     origin: ["http://localhost:3000"],
//     credential: true
// }))

app.use(cookieParser())

app.use('/auth', userRouter)

mongoose.connect(process.env.MONGO_URL)

app.listen(port, ()=>{
    console.log("Server Started in 8000s");
})
