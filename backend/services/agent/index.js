import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import router from "./routes/agent.route.js";
dotenv.config();

const app = express();

const port = process.env.PORT || 8003

app.use(express.json())

app.use("/",router);

app.use((err, req, res, next)=>{
    console.log(err)
    if(err.status){
        return res.status(err.status).json(err.data)
    }
    return res.status(500).json({message:`agent error: ${err}`})
})

app.get("/", (req, res)=>{
    res.json({message:`Agent service running on ${port}`})
})

app.listen(port, async ()=>{
    await connectDB()
    console.log(`Agent service running on ${port}`)
})