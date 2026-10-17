import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";
dotenv.config();

const app = express();
app.use(express.json())

const port = process.env.PORT || 8001

app.use("/", router)

app.get("/",(req, res)=>{
    res.json({message:"Auth is running"})
})

app.listen(port, async ()=>{
    await connectDB();
    console.log(`Auth is running on ${port}`)
})