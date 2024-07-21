'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Header from '@/components/header';
import Disclaimer from '@/components/Disclaimer';
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const AnalyticsPage = () => {
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
  }, []);

  useEffect(() => {

    const getAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const interviewId = localStorage.getItem('interviewid')
        const res = await axios.get(`/api/interview/analytics/${interviewId}`, {
          headers: {
            Authorization: token
          }
        });
        console.log(res.data.interview)
        setInterviewData(res.data.interview);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch analytics data');
        setLoading(false);
      }
    };
    getAnalytics();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      please wait this may take take few sections loading...    </div>
  );
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  if (!interviewData) return <div className="flex justify-center items-center h-screen">No data available</div>;

  const { jobDescription, answersWithQuestions, totalScore, counter, dateAndTime } = interviewData;

  // Prepare data for the emotions chart
  const emotions = [...new Set(answersWithQuestions.flatMap(q => Object.keys(q.emotions)))];
  const emotionsData = answersWithQuestions.map((q, i) => ({
    question: `Q${i + 1}`,
    ...emotions.reduce((acc, emotion) => ({ ...acc, [emotion]: q.emotions[emotion] || 0 }), {})
  }));

  const emotionsChartData = {
    labels: emotionsData.map(d => d.question),
    datasets: emotions.map((emotion, index) => ({
      label: emotion,
      data: emotionsData.map(d => d[emotion]),
      backgroundColor: `hsl(${index * 30}, 70%, 50%)`,
    })),
  };

  const emotionsChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Emotions Analysis' },
    },
  };

  // Prepare data for the ratings chart
  const ratingsData = {
    labels: answersWithQuestions.map((_, i) => `Q${i + 1}`),
    datasets: [{
      label: 'Ratings',
      data: answersWithQuestions.map(q => q.rating),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }],
  };

  const ratingsChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Question Ratings' },
    },
    scales: {
      y: { beginAtZero: true, max: 5 },
    },
  };

  // Prepare data for the overall emotions pie chart
  const overallEmotions = emotions.reduce((acc, emotion) => {
    acc[emotion] = emotionsData.reduce((sum, d) => sum + d[emotion], 0);
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(overallEmotions),
    datasets: [{
      data: Object.values(overallEmotions),
      backgroundColor: Object.keys(overallEmotions).map((_, index) => `hsl(${index * 30}, 70%, 50%)`),
    }],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Overall Emotions Distribution' },
    },
  };
  if (loading) {
    return <h1> please wait this may take take few sections loading...</h1>
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6"> Analytics</h1>
        <Disclaimer />

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Interview Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2"><span className="font-semibold">Job Description:</span> {jobDescription}</p>
            <p className="mb-2"><span className="font-semibold">Total Score:</span> {totalScore}</p>
            <p className="mb-2"><span className="font-semibold">Questions Answered:</span> {counter}</p>
            <p><span className="font-semibold">Date:</span> {new Date(dateAndTime).toLocaleString()}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Emotions Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar options={emotionsChartOptions} data={emotionsChartData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Question Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <Line options={ratingsChartOptions} data={ratingsData} />
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Overall Emotions Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full max-w-md mx-auto">
              <Pie options={pieChartOptions} data={pieChartData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Question Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            {answersWithQuestions.map((item, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <p className="mb-2"><span className="font-semibold">Question {index + 1}:</span> {item.question}</p>
                {/* <p className="mb-2"><span className="font-semibold">Answer:</span> {item.answer}</p> */}
                <p className="mb-2"><span className="font-semibold">Rating:</span> {item.rating}/5</p>
                <p><span className="font-semibold">FeedbackAnswers:</span> {item.feedbackAnswer}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>

  );
};

export default AnalyticsPage;