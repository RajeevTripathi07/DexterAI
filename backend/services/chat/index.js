import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import router from "./routes/chat.route.js";
dotenv.config();

const app = express();

const port = process.env.PORT || 8002

app.use(express.json())

app.use("/", router)

app.get("/", (req, res)=>{
    res.json({message:"Chat service is running at ",port})
})

app.listen(port, async ()=>{
    await connectDB()
    console.log(`Chat service running on ${port}`)
})