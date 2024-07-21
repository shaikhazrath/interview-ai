'use client'
import React, { useEffect, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const GoogleAuthComponent = () => {
  const router = useRouter();
  const [error, setError] = useState();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, [token]);

  const responseGoogle = async (response) => {
    try {
      const idToken = response.credential;
      const res = await axios.post(`/api/users/googleAuth`, {
        idToken,
      });
      localStorage.setItem('token', res.data.token);
      router.push('/')
    } catch (error) {
      console.log(error);
      setError("Authentication failed. Please try again.");
    }
  };

  const onFailure = (error) => {
    console.error("Google sign-in failed:", error);
    setError("Google sign-in failed. Please try again.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
        <div className="space-y-6">
          <div className="flex items-center justify-center mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-black animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-center text-black">Welcome to AI Interview</h2>
          <p className="text-center text-gray-600">
            Elevate your interview skills with AI-powered practice
          </p>
        </div>
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="text-center">{error}</p>
          </div>
        )}
        <div className="mt-8">
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH}>
            <div className="flex justify-center">
              <GoogleLogin
                clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH}
                onSuccess={responseGoogle}
                onFailure={onFailure}
                size="large"
                width="300"
                shape="pill"
                type="standard"
                logo_alignment="left"
                theme="outline"
                render={(props) => (
                  <button
                    onClick={props.onClick}
                    disabled={props.disabled}
                    className="w-full bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 transform hover:scale-105 shadow-md"
                  >
                    Sign in with Google
                  </button>
                )}
              />
            </div>
          </GoogleOAuthProvider>
        </div>
        <p className="text-center text-sm text-gray-600 mt-8">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-black hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-black hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default GoogleAuthComponent;