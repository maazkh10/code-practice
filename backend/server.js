import dotenv from "dotenv";

dotenv.config();
import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";

import useRouter from "./routes/userrouter.js"

import "./config/reminderCron.js"

const app = express()



app.use(cors());
app.use(express.json());

connectDb()



const PORT = 7900
app.get("/" , (req , res) =>{
    res.send("Hello World")
})
app.use("/api/users" , useRouter)

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
})