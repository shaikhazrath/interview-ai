import React, { useState, useEffect } from 'react';
import { FaMicrophoneLines, FaMicrophoneLinesSlash } from 'react-icons/fa6';
import Loading from './Loading';

const AudioInputComponent = ({ submitAnswer, processing }) => {
  const [text, setText] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onresult = function (event) {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setText(prevText => [...prevText, transcript]);
    };

    recognitionInstance.onend = function () {
      setIsRecording(false);
    };

    setRecognition(recognitionInstance);

    return () => {
      recognitionInstance.stop();
    };
  }, []);

  const handleOnRecord = () => {
    if (recognition && !isRecording) {
      setText([]);
      setIsRecording(true);
      recognition.start();
    }
  };

  const handleOnStop = async () => {
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
      submitAnswer(text.join(' '));
      setText([]);
    }
  };

  return (
    <div className='w-full flex justify-center'>
          {!processing && 
      <button
        onClick={isRecording ? handleOnStop : handleOnRecord}
        className={`
          flex items-center justify-center
          px-6 py-3 text-lg font-semibold
          rounded-full transition-all duration-300 ease-in-out
          ${isRecording 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-green-500 hover:bg-green-600 text-white'}
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${isRecording ? 'focus:ring-red-400' : 'focus:ring-green-400'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isRecording ? 
          <div className='flex justify-center items-center bg-transparent'>
            <h1 className='bg-transparent'>
              Stop Answering 
            </h1>
            <FaMicrophoneLinesSlash className='bg-transparent ml-2'/>
          </div> :  
          <div className='flex justify-center items-center bg-transparent '>
            <h1 className='bg-transparent'>
              Start Answering
            </h1>
            <FaMicrophoneLines className='bg-transparent ml-2' />
          </div>
        }
      </button>
      }
      {processing && <Loading />}
    </div>
  );
};

export default AudioInputComponent;
