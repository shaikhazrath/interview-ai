import { connect } from "@/config/dbConfig";
import User from "@/model/userModel";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { verifyToken } from "@/utils/verifyToken";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_OAUTH);

connect();

export async function POST(request) {
  try {
    const { idToken } = await request.json();
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.NEXT_PUBLIC_GOOGLE_OAUTH,
    });
    const payload = ticket.getPayload();
    const { name, email } = payload;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email });
      await user.save();
      console.log(user);
    }
    const token = jwt.sign({ id: user._id }, process.env.NEXT_PUBLIC_JWT_SEC, { expiresIn: "24h" });
    const responseData = {
      token,
      name,
      message: user.isNew ? "New user created" : "User found",
    };
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(request) {
  try {
    const tokenCheck = await verifyToken(request.headers);

    if (tokenCheck.status !== 200) {
      return new Response(JSON.stringify({ message: tokenCheck.message }), { status: tokenCheck.status });
    }
    return new Response(JSON.stringify(tokenCheck.user), { status: 200 });

  } catch (error) {
    console.log(error)
    return new Response("Internal Server Error", { status: 500 });
  }
}