import { connect } from "@/config/dbConfig";
import interview from "@/data/premadeInterviews";
import interviewModel from "@/model/interviewModel";
import { verifyToken } from "@/utils/verifyToken";

// Connect to the database
connect();

export async function POST(request) {
  // Verify the token
  const tokenCheck = await verifyToken(request.headers);

  if (tokenCheck.status !== 200) {
    return new Response(JSON.stringify({ message: tokenCheck.message }), { status: tokenCheck.status });
  }

  try {
    // Parse the request body
    const { id } = await request.json();
    const user = tokenCheck.user;

    // Find the interview by ID
    const selectedInterview = interview.find(item => item.id === id);
    const jobDescription = selectedInterview.description

    if (!selectedInterview) {
      return new Response(JSON.stringify({ message: "Interview not found" }), { status: 404 });
    }

    // Prepare the questions with null answers
    const questionsWithAnswers = selectedInterview.questions.map(({ question, feedbackAnswer }) => ({
      question,
      feedbackAnswer  
    }));

    // Create a new interview setup
    const interviewSetup = new interviewModel({
      user: user._id,
      jobDescription,
      answersWithQuestions: questionsWithAnswers,
      premade:true
    });

    // Save the interview setup to the database
    const savedInterview = await interviewSetup.save();

    // Return the saved interview
    return new Response(JSON.stringify(savedInterview), { status: 200 });
  } catch (error) {
    console.error("Error in POST /interviews:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
