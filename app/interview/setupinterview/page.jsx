'use client'
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight } from 'lucide-react';
import { SetupCards } from '@/components/setupCards';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import WordPullUp from "@/components/magicui/word-pull-up";
import interview from '@/data/premadeInterviews';
import Header from '@/components/header';
const InterviewSetup = () => {  
  const [jobDescription, setJobDescription] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const router = useRouter();

  const handleDescriptionChange = (newDescription) => {
    setJobDescription(newDescription);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authorization token is missing');
      }

      const postData = { jobDescription };
      const res = await axios.post(
        '/api/interview/setUpInterview',
        postData,
        {
          headers: {
            authorization: token
          }
        }
      );
      localStorage.setItem('interviewid', res.data._id);

      if (res.data) {
        router.push('/interview/takeinterview');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <Header />

    <div className="min-h-screen bg-gradient-to-b from-black dark:to-zinc-900 text-white pb-5 ">
      <div className="max-w-6xl mx-auto">
        <header className="mb-5 text-center">
          <WordPullUp
            className="text-2xl font-bold tracking-[-0.02em] -white md:text-4xl md:leading-[5rem] uppercase"
            words="Setup Interview"
          />
        </header>

        <div>
        <div className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold mb-4">Custome Job Description</h2>
              <textarea
                placeholder="Paste or type the full job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`w-full bg-black border p-2 rounded-md border-gray-700 text-white resize-none ${isFocused ? 'h-96' : 'h-26'}`}
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <Button
              onClick={handleSubmit}
              className="w-full bg-white text-black hover:bg-black hover:text-white transition-colors text-lg py-6 border border-white"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Submit'} <ChevronRight className="ml-2" />
            </Button>
          </div>
          <div className='mt-12'>
            <h1 className='text-xl font-bold pb-5'>Try Premade Setups</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {interview.map((data, index) => (
                <SetupCards key={index} data={data}  />
              ))}
            </div>
          </div>
        
        </div>
      </div>
      <footer className=" mt-5 py-12">
        <div className="container mx-auto px-4">
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} InterviewAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>

    </div>

  );
};

export default InterviewSetup;
