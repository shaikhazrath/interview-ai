'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Editor } from '@monaco-editor/react';
import { Code, X, Mic, MicOff } from 'lucide-react';
import FaceEmotionDetection from '@/components/Videoemotion';
import AudioInputComponent from '@/components/AudioManagement';
import hr from '@/public/hr.png';

const Page = () => {
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [processing, setProcessing] = useState(false);
  const [emotions, setEmotions] = useState({});
  const router = useRouter();

  const getQuestion = async () => {
    try {
      setQuestion('');
      setEmotions({});
      setProcessing(true);
      const token = localStorage.getItem('token');
      const interviewid = localStorage.getItem('interviewid');
      const res = await axios.get(`/api/interview/questions/${interviewid}`, {
        headers: { Authorization: token },
      });
      if (res.data.message === 'Interview completed') {
        window.location.href = '/interview/analytics';
      } else {
        setQuestion(res.data.question);
        setProcessing(false);
      }
    } catch (error) {
      setQuestion('');
      setProcessing(false);
      console.error(error);
    }
  };


  useEffect(()=>{
    const speakText = () => {
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    };
    speakText()
  },[question])

  const submitAnswer = async (Answer) => {
    try {
      const token = localStorage.getItem('token');
      const interviewid = localStorage.getItem('interviewid');
      await axios.post(`/api/interview/questions/${interviewid}`, { Answer, emotions }, {
        headers: { Authorization: token },
      });
      getQuestion();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const handleIncrementCount = (emotionType) => {
    setEmotions((prevEmotions) => ({
      ...prevEmotions,
      [emotionType]: (prevEmotions[emotionType] || 0) + 1,
    }));
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <div className="flex flex-col h-[100vh] p-4">
        <header className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold text-white">AI Interview Assistant</h1>
          {/* <button
            onClick={() => setIsEditorVisible(!isEditorVisible)}
            className="px-3 py-1 flex items-center gap-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-all duration-300"
          >
            {isEditorVisible ? <X className="w-4 h-4" /> : <Code className="w-4 h-4" />}
            {isEditorVisible ? 'Close' : 'Code'}
          </button> */}
        </header>

        <main className="flex-grow flex gap-2 overflow-hidden">
          <section className={`flex flex-col ${isEditorVisible ? 'w-1/2' : 'w-full'}`}>
            <div className="bg-zinc-900 rounded-lg p-3 mb-2 shadow-lg flex-shrink-0">
              <h2 className="text-lg font-semibold text-white mb-1">Question</h2>
              <p className="text-sm text-gray-300">{question || 'Waiting for the next question...'}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 flex-grow overflow-hidden">
              <div className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg flex flex-col">
                <div className="p-2 bg-zinc-700">
                  <h3 className="text-sm font-semibold text-white">Your Video</h3>
                </div>
                <div className="relative flex-grow">
                  <FaceEmotionDetection IncrementCount={handleIncrementCount} />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg flex flex-col">
                <div className="p-2 bg-zinc-700">
                  <h3 className="text-sm font-semibold text-white">Interviewer</h3>
                </div>
                <div className="relative flex-grow">
                  <Image
                    src={hr}
                    layout="fill"
                    objectFit="cover"
                    alt="HR Representative"
                  />
                </div>
              </div>
            </div>
          </section>

          {isEditorVisible && (
            <section className="w-1/2 bg-zinc-800 rounded-lg overflow-hidden shadow-lg flex flex-col">
              <div className="p-2 bg-zinc-700">
                <h3 className="text-sm font-semibold text-white">Code Editor</h3>
              </div>
              <Editor
                height="100%"
                defaultLanguage="javascript"
                defaultValue="// Start coding here"
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                }}
              />
            </section>
          )}
        </main>

        <footer className="mt-2">
          <AudioInputComponent
            generatedContent={question}
            GetQuestion={getQuestion}
            submitAnswer={submitAnswer}
            processing={processing}
          />
        </footer>
      </div>
    </div>
  );
};

export default Page;