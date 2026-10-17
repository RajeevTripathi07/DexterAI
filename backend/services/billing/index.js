import express from "express"
import dotenv from "dotenv"
dotenv.config();
import connectDB from "./config/db.js";
import router from "./routes/billing.route.js";

const app = express();
app.use(express.json())

const port = process.env.PORT || 8004

app.use("/", router)
app.get("/",(req, res)=>{
    res.json({message:"Billing is running"})
})

app.listen(port, async ()=>{
    await connectDB();
    console.log(`Billing is running on ${port}`)
})