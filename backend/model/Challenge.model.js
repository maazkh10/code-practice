import mongoose from "mongoose";


const challengeSchema = new mongoose.Schema({
  // This is the Day number (1, 2, 3...)
  day: {
    type: Number,
    required: true,
    unique: true
  },
  // This is an array of objects to hold the 5 problems per day
  problems: [
    {
      title: { 
        type: String, 
        required: true 
      },
      difficulty: { 
        type: String, 
        required: true 
      },
      description: { 
        type: String, 
        required: true 
      },
      expectedOutput: { 
        type: mongoose.Schema.Types.Mixed, 
        required: true 
      },
      answerType: {
        type : String,
        required : true
      }
    }
  ]
}, { timestamps: true }); // Timestamps go in the second argument

const Challenge = mongoose.model("Challenge", challengeSchema);
export default Challenge;