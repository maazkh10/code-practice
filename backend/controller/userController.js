import mongoose from "mongoose";

import User from "../model/user.model.js";
import Challenge from "../model/Challenge.model.js";
import Submisson from "../model/Submission.model.js";

 import compareAns from "../data/compareAnswer.js";
export const startChallenge = async(req , res) =>{
    const {email , plan} = req.body;

    if (!email || !plan) {
        return res.status(400).json({ message: "Email and plan are required" });    
    }
    try {
       const user = await User.findOne({email : email.toLowerCase() })
       if (user) {
        return res.status(400).json({ message: "User already exists" });
       }
       
       const newUser = await User.create({
        email : email.toLowerCase(),
        plan,
        startDate : new Date(),
        currentDay : 1
       })
       res.status(201).json({user: newUser, message: "Challenge started successfully"})
    } catch (error) {
        console.error("Error starting challenge:", error);
        res.status(500).json({ message: "Server error" });       
    }
}

export const getTodaysChallenge = async(req , res) =>{
    try {
        const {email} = req.params;
        const user = await User.findOne({email:email.toLowerCase()})
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    
        console.log("searching for day" , user.currentDay)

        const allday = await Challenge.find({})
        // console.log(allday)
        
        const todayChallenge = await Challenge.findOne({
            day : user.currentDay
        })
    
        if (!todayChallenge) {
            return res.status(404).json({ message: "Today's challenge not found" });
        }

        const solved = await Submisson.find({
            email: user.email,
            day: user.currentDay,
            isCoorect : true
        })

        const solvedIds = solved.map((itm) => itm.problemId.toString())

    
       res.status(200).json({
        currentDay : user.currentDay,
         plan : user.plan,
         problems : todayChallenge ? todayChallenge.problems: [],
         solvedIds : solvedIds
       })
    } catch (error) {
        console.error("Error fetching today's challenge:", error);
        res.status(500).json({ message: "Server error" });
    }
}


export const submitProblem = async(req , res ) =>{
    const {email , problemId  , output} = req.body;

    if (!email || ! problemId || !output) {
        return res.status(400).json({
            message: "Email, problemId and output are required"
        })
    }

    const todayUser = await User.findOne({email: email.toLowerCase()})

    if (!todayUser) {
        return res.status(404).json({ message: "User not found" });
    }

    const todayChallenge = await Challenge.findOne({
        day :todayUser.currentDay
    })
    if (!todayChallenge) {
        return res.status(404).json({ message: "Today's challenge not found" });
    }
    const problem = todayChallenge.problems.find(
        (p) => p._id.toString() === problemId
    );
    if (!problem) {
        return res.status(404).json({ message: "Problem not found for today" });
    }
    // const iscorrect = problem.expectedOutput.trim().toLowerCase() === output.trim().toLowerCase();

    const isCoorect = compareAns(
        problem.expectedOutput,
        output,
        problem.answerType
    )

    if (!isCoorect) {
        return res.status(200).json({
            success: false,
            correct: false,
            message : "Incorrect output keep trying"
        })
    }
    
    // checking for dublicated sumbition 
    const alredysub = await Submisson.findOne({
        email: email.toLowerCase(),
        problemId 
    })

    if (alredysub) {
        return res.status(400).json({ message: "Solution already submitted for this problem" });
    }
    
    const newSub = await Submisson.create({
        email: email.toLowerCase(),
        problemId,
        day : todayUser.currentDay,
        isCoorect : true,
        
        output
    })

    console.log("DB Value:", `[${problem.expectedOutput}]`, "Length:", problem.expectedOutput.length);
console.log("User Value:", `[${output}]`, "Length:", output.length);



res.status(200).json({
 success:true,
 correct:isCoorect,
 message:"Submitted successfully"
})
}