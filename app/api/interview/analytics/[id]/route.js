import { connect } from "@/config/dbConfig";
import analyticsModel from "@/model/analyticsModel";
import interviewModel from "@/model/interviewModel";
import { verifyToken } from "@/utils/verifyToken";
import { GoogleGenerativeAI } from "@google/generative-ai";

connect();

export async function GET(request, { params }) {
    const tokenCheck = await verifyToken(request.headers);

    if (tokenCheck.status !== 200) {
        return new Response(JSON.stringify({ message: tokenCheck.message }), { status: tokenCheck.status });
    }

    try {
        const api_key = process.env.NEXT_PUBLIC_GEMINI_API;
        const genAI = new GoogleGenerativeAI(api_key);
        const user = tokenCheck.user;

        const interview = await interviewModel.findOne({ _id: params.id, user: user._id });
        if (!interview) {
            return new Response(JSON.stringify({ message: "Interview not found" }), { status: 404 });
        }
            if (interview.answersWithQuestions[0].rating !== null) {
                return new Response(JSON.stringify({ message: "Analysis data retrieved successfully", interview }), { status: 200 });
            }
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        for (let i = 0; i < interview.answersWithQuestions.length; i++) {
            const rating = await model.generateContent([
                `Rate this answer to the question on a scale of 0-5:
Q: ${interview.answersWithQuestions[i].question}
A: ${interview.answersWithQuestions[i].answer}
Provide only the numeric rating (0 for unrelated, 1-5 for relevant).`
            ]);

            interview.answersWithQuestions[i].rating = parseInt(rating.response.text()+1);
            interview.totalScore = parseInt(rating.response.text()) +  interview.totalScore
            await interview.save();
        }

        return new Response(JSON.stringify({ message: "Analysis data retrieved successfully", interview }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}
