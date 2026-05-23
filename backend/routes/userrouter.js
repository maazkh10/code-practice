import express from "express";
import { getTodaysChallenge, startChallenge, submitProblem  } from "../controller/userController.js";

const router = express.Router()

router.get("/" , (req , res) =>{
    res.send("Hello World")
})


router.post("/start" , startChallenge)


router.get("/challenge/:email" , getTodaysChallenge)

router.post("/submit" , submitProblem)
export default router