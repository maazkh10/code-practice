import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, 

    },
    problemId :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Challenge"
    },
    day: {
        type : Number,
        required: true
    },
    isCoorect :{
        type : Boolean,
        required: true
    },
    submittedAt :{
        type : Date,
        default : Date.now
    }
}, {timestamps: true})

const Submisson = mongoose.model("submition" , submissionSchema)
export default Submisson;
