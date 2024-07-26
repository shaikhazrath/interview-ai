'use client'
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const ResumeBuilder = () => {
  // ... [Previous state declarations remain the same]

  const resumeRef = useRef(null);

  // ... [Previous handler functions remain the same]

  const downloadResume = () => {
    const element = resumeRef.current;
    const opt = {
      margin:       1,
      filename:     `${personalInfo.name.replace(/\s+/g, '_')}_resume.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Professional Resume Builder</h1>
      
      {/* ... [Previous input fields and sec remain the same] */}

      <Button className="w-full mb-4" onClick={downloadResume}>
        <Download className="w-4 h-4 mr-2" /> Download Resume
      </Button>

      <div ref={resumeRef} className="border p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.name}</h1>
        <p className="text-xl mb-4">{jobTitle}</p>
        <div className="flex justify-between mb-4">
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.email}</span>
          <span>{personalInfo.linkedin}</span>
        </div>
        
        <h2 className="text-2xl font-semibold mb-2">Profile Summary</h2>
        <p className="mb-4">{profileSummary}</p>
        
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        <ul className="list-disc pl-5 mb-4">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
        
        <h2 className="text-2xl font-semibold mb-2">Core Competencies</h2>
        <ul className="list-disc pl-5 mb-4">
          {coreCompetencies.map((competency, index) => (
            <li key={index}>{competency}</li>
          ))}
        </ul>
        
        <h2 className="text-2xl font-semibold mb-2">Professional Experience</h2>
        {workExperience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold">{exp.company}</h3>
            <p className="font-semibold">{exp.position}</p>
            <p className="italic mb-2">{exp.duration}</p>
            <ul className="list-disc pl-5">
              {exp.responsibilities.map((resp, respIndex) => (
                <li key={respIndex}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeBuilder;