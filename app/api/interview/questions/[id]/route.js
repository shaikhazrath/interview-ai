import { connect } from "@/config/dbConfig";
import interviewModel from "@/model/interviewModel";
import userModel from "@/model/userModel";
import { verifyToken } from "@/utils/verifyToken";
connect();

export async function GET(request, { params }) {
    const tokenCheck = await verifyToken(request.headers);
    if (tokenCheck.status !== 200) {
        return new Response(JSON.stringify({ message: tokenCheck.message }), { status: tokenCheck.status });
    }
    try {
        const user = tokenCheck.user;
        const interviewId = params.id;
        const interview = await interviewModel.findOne({ _id: interviewId, user: user._id });
        if (!interview) {
            return new Response(JSON.stringify({ message: "Interview not found" }), { status: 404 });
        }
        const index = interview.counter;
        const answersWithQuestions = interview.answersWithQuestions;
        if (index === answersWithQuestions.length) {
            return new Response(JSON.stringify({ message: "Interview completed" }), { status: 200 });
        }
        const question = answersWithQuestions[index].question;
        return new Response(JSON.stringify({ question }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}



export async function POST(request, { params }) {
    const tokenCheck = await verifyToken(request.headers);
    if (tokenCheck.status !== 200) {
        return new Response(JSON.stringify({ message: tokenCheck.message }), { status: tokenCheck.status });
    }
    try {
        const user = tokenCheck.user;
        let { Answer, emotions } = await request.json(); // Updated to destructure emotions
        console.log(emotions)
        const interviewId = params.id;

        if (!Answer) {
            Answer = 'no answer';
        }
        const interview = await interviewModel.findOne({ _id: interviewId, user: user._id });
        if (!interview) {
            return new Response(JSON.stringify({ error: 'Interview not found.' }), { status: 404 });
        }
        const index = interview.counter;
        if (index === interview.answersWithQuestions.length) {
            return new Response(JSON.stringify({ message: 'All questions completed.' }));
        }
        interview.answersWithQuestions[index].answer = Answer;
        interview.answersWithQuestions[index].emotions = emotions; // Save emotions
        interview.counter = index + 1;
        const data = await interview.save();
        return new Response(JSON.stringify({ data }));
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}



