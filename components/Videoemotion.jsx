'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import { BiCameraOff,BiSolidCamera  } from "react-icons/bi";

export default function FaceEmotionDetection({ IncrementCount }) {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const videoRef = useRef();
  const streamRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; 
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
          streamRef.current = stream;
          videoRef.current.srcObject = stream;
        })
        .catch(err => console.error('Error accessing the webcam: ', err));
    };

    const stopVideo = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        videoRef.current.srcObject = null;
      }
    };

    const handleVideo = async () => {
      const video = videoRef.current;

      video.addEventListener('play', async () => {
        setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

          if (detections.length > 0) {
            const emotion = Object.entries(detections[0].expressions).reduce(
              (a, [b, c]) => (c > a[1] ? [b, c] : a),
              ['', 0]
            )[0];
            IncrementCount(emotion);
          }
        }, 1000);
      });
    };

    if (isCameraOn) {
      loadModels().then(startVideo).then(handleVideo);
    } else {
      stopVideo();
    }

    // Cleanup video stream when component unmounts
    return () => {
      stopVideo();
    };
  }, [isCameraOn]);

  const toggleCamera = () => {
    setIsCameraOn(prev => !prev);
  };

  return (
    <div className=''>
      <button onClick={toggleCamera} className="mb-4 p-2 bg-blue-500 text-white rounded fixed z-10 m-2 ">
      {isCameraOn ? (
          <>
            < BiSolidCamera className="h-5 w-5" />
          </>
        ) : (
          <>
            <BiCameraOff className="h-5 w-5" />
          </>
        )}      </button>
      <video ref={videoRef} className="w-full h-full object-cover rounded-lg" autoPlay muted />
    </div>
  );
}
