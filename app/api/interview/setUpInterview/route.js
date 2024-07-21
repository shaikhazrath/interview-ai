import { connect } from "@/config/dbConfig";
import interviewModel from "@/model/interviewModel";
import userModel from "@/model/userModel";
import { verifyToken } from "@/utils/verifyToken";
import { GoogleGenerativeAI } from "@google/generative-ai";
connect();

export async function POST(request) {
    const tokenCheck = await verifyToken(request.headers);

    if (tokenCheck.status !== 200) {
      return new Response(JSON.stringify({ message: tokenCheck.message }), { status: tokenCheck.status });
    }
    try {
        const api_key = process.env.NEXT_PUBLIC_GEMINI_API;
        const genAI = new GoogleGenerativeAI(api_key);
        const { jobDescription } = await request.json();
        const user = tokenCheck.user;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Assume the role of a job recruiter. Based on the following job description: ${jobDescription}, prepare 7 interview questions, one per line dont give any other information`;

        const result = await model.generateContent([prompt]);
        let questions = result.response.text().split('\n').filter(question => question.trim() !== '');
        questions = questions.map(question => question.trim());

        const questionsWithNullAnswers = questions.map(question => ({ question: question, answer: null }));

        const interview = new interviewModel({
            user: user._id,
            jobDescription: jobDescription,
            answersWithQuestions: questionsWithNullAnswers
        });

        const savedInterview = await interview.save();
        return new Response(JSON.stringify(savedInterview), { status: 200 });
    } catch (error) {
        return new Response("Internal Server Error", { error, status: 500 });
    }
}

