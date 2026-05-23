import cron from "node-cron"

import User from "../model/user.model.js"

import Challenge from '../model/Challenge.model.js'

import Submisson from '../model/Submission.model.js'

import nodemailer from "nodemailer"


console.log("email user" , process.env.EMAIL_USER)
const transporter  = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user: "maazkh2700@gmail.com",
        pass : "uqwtvmkohcmimqty"
    },
});


cron.schedule("0 */6 * * *", async () => {
    const now = new Date()
    const hours = now.getHours()

    if (hours === 0) {
        console.log("these are ur todays task")
    }else{
        console.log("check this out pls")
    }

    try {
        const users = await User.find({})

        for(const user of users){
            if (user.currentDay > user.plan) continue;

            const todaychalleng = await Challenge.findOne({
                day: user.currentDay,
            })

            if (!todaychalleng) continue

            const solved = await Submisson.find({
                email: user.email,
                day: user.currentDay,
                isCoorect: true
            })

            const solvedIds = solved.map((itm) => itm.problemId.toString() )

            // pendingone 
            const pendingproblem = 
            todaychalleng.problems.filter(
                (prom) => !solvedIds.includes(prom._id.toString())
            );

            if (pendingproblem.length === 0) continue 



            // problem list 
            const problemlist = pendingproblem.map((itm , index) =>`
             <li style="margin-bottom:10px;">
              <strong>${index + 1} . ${itm.title} </strong>
              (${itm.difficulty})
              </li>
            `)
        .join("")
            

            const mailOptions = {
                from : "maazkh2700@gmail.com",
                to : user.email,
                subject : `Day ${user.currentDay} pending coding challenges`,
                html: `
                <div style="font-family:Arial;padding:20px;"> 
                 <h2> Hello developer </h2>
                 <p>${pendingproblem.length} <br/>pending challenges for Day ${user.currentDay} </p>
                
                 <ul>
                  ${problemlist}
                 </ul>
                 <p>Stay consistent. Finish today's streak 🔥</p>
                 </div>
                `
            }

            await transporter.sendMail(mailOptions)
            console.log(`mail send to ${user.email}`)
        }

    } catch (error) {
        console.log("❌ Cron Error:", error.message);
    }
})