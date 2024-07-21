import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    answersWithQuestions: [{
        question: {
            type: String,
        },
        answer: {
            type: String,
            default: null
        },
        rating: {
            type: Number,
            default: null
        },
        feedbackAnswer: {
            type: String,
            default: null
        },
        emotions: { 
            type: Map,
            of: Number,
            default: {}
        },
    }],
    totalScore: {
        type: Number,
        default: 0
    },
    counter: {
        type: Number,
        default: 0
    },
    premade:{
        type:Boolean,
        default:false,
    },
    dateAndTime: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Interview || mongoose.model("Interview", interviewSchema);
