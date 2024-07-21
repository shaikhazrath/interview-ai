'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Mic, Brain, ChevronRight, FileText, Send, Twitter, Linkedin, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import ShineBorder from "@/components/magicui/shine-border";

export default function Home() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="min-h-screen  bg-gradient-to-t from-black to-black text-gray-100 transition-colors duration-300">
      <Header />
      <main className="container mx-auto mt-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Practice Your Interviews with AI</h1>
          <p className="text-xl text-gray-400 mb-8">Practice, analyze, and improve your interview skills with our cutting-edge AI technology</p>
          <div className="flex justify-center flex-col gap-2 items-center md:flex-row ">
          <Button size="lg" onClick={() => router.push('/profile')} className=" bg-white text-black hover:bg-black hover:text-white border w-48 ">
            Resume Builder <ChevronRight className="ml-2" />
          </Button>
          <Button size="lg" onClick={() => router.push('/interview/setupinterview')} className=" bg-white text-black hover:bg-black hover:text-white border w-48  ">
           Take Interview <ChevronRight className="ml-2" />
          </Button>
          </div>
    
        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-16">
          <ShineBorder
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
 className="bg-black p-6 rounded-lg shadow-md text-center">
            <FileText className="mx-auto text-white mb-4" size={48} />
            <h2 className="text-xl text-white font-semibold mb-2">Tailored Questions</h2>
            <p className="text-gray-400">Get interview questions customized to specific job descriptions</p>
          </ShineBorder>
          <ShineBorder
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} className="bg-black p-6 rounded-lg shadow-md text-center">
            <Mic className="mx-auto text-white mb-4" size={48} />
            <h2 className="text-xl text-white font-semibold mb-2">Speech Recognition</h2>
            <p className="text-gray-400">Advanced speech-to-text technology captures and analyzes your responses</p>
            </ShineBorder>
            <ShineBorder
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} className="bg-black p-6 rounded-lg shadow-md text-center">
            <Camera className="mx-auto text-white mb-4" size={48} />
            <h2 className="text-xl text-white font-semibold mb-2">Video Analysis</h2>
            <p className="text-gray-400">Our AI analyzes your facial expressions and body language during the interview</p>
            </ShineBorder>
            <ShineBorder
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} className="bg-black p-6 rounded-lg shadow-md text-center">
            <Brain className="mx-auto text-white mb-4" size={48} />
            <h2 className="text-xl text-white font-semibold mb-2">Smart Feedback</h2>
            <p className="text-gray-400">Receive personalized feedback and tips to improve your interview performance</p>
            </ShineBorder>
            </div>
      </main>
      <footer className="bg-black mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} InterviewAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
