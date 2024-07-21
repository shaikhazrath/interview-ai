'use client'
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlusCircle, MinusCircle } from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import Header from '@/components/header';

const ResumeBuilder = ({ initialData }) => {
    const [resumeData, setResumeData] = useState({
        name: 'Alex Johnson',
        phone: '(123) 456-7890',
        email: 'alex.johnson@example.com',
        linkedin: 'linkedin.com/in/alexjohnson',
        title: 'Computer Science Graduate',
        summary: 'Recent computer science graduate with a passion for software development and problem-solving. Eager to apply my skills in a professional setting and contribute to innovative projects. Strong foundation in object-oriented programming, web development, and data analysis.',
        education: [
            {
                degree: 'Bachelor of Science in Computer Science',
                institution: 'Tech University',
                year: '2023',
                CGPA: '7.8/10.0',
                relevantCourses: [
                    'Software Engineering',
                    'Database Systems',
                    'Operating Systems',
                    'Artificial Intelligence',
                    'Web Development'
                ]
            }
        ],
        skills: [
            'Java', 'Python', 'JavaScript', 'HTML/CSS',
            'React', 'Node.js', 'Git', 'SQL', 'NoSQL',
            'Data Structures', 'Algorithms', 'RESTful APIs',
            'Unit Testing', 'Agile Methodologies', 'Docker'
        ],
        projects: [
         
            {
                name: 'Weather Forecasting App',
                description: 'Built a weather forecasting application using Python, Flask, and OpenWeatherMap API.',
                highlights: [
                    'Utilized Matplotlib and Seaborn for data visualization of weather trends.',
                    'Implemented geolocation using HTML5 Geolocation API for automatic local weather updates.',
                    'Designed a user-friendly interface with Bootstrap for easy navigation.',
                    'Implemented caching mechanisms to reduce API call frequency.',
                    'Deployed the application on Heroku for easy access.'
                ]
            },
            {
                name: 'Personal Portfolio Website',
                description: 'Created a personal portfolio website to showcase my projects and skills.',
                highlights: [
                    'Developed using React and Gatsby for a fast and responsive experience.',
                    'Implemented a contact form with email functionality using EmailJS.',
                    'Used GraphQL to fetch data for the blog section.',
                    'Optimized for SEO with proper meta tags and sitemap.',
                    'Deployed on Netlify with continuous integration from GitHub.'
                ]
            }
        ],
        achievements: [
            'Dean\'s List for Academic Excellence (2021-2023)',
            'Winner of University Hackathon (2022) - Developed a machine learning model to predict stock prices.',
            'Volunteer coding instructor for local high school students - Taught basics of Python and web development.',
            'Recipient of the Tech University Scholarship for Outstanding Achievement in Computer Science (2020-2023)'
        ]
    });
    
  const resumeRef = useRef(null);

  const handleInputChange = (e, section, index, subField) => {
    const { name, value } = e.target;
    setResumeData(prev => {
      if (section) {
        if (Array.isArray(prev[section])) {
          const newArray = [...prev[section]];
          if (subField) {
            newArray[index] = { ...newArray[index], [subField]: value };
          } else {
            newArray[index] = value;
          }
          return { ...prev, [section]: newArray };
        } else if (typeof prev[section] === 'object') {
          return {
            ...prev,
            [section]: {
              ...prev[section],
              [name]: value
            }
          };
        }
      }
      return { ...prev, [name]: value };
    });
  };

  const addField = (section, subSection) => {
    setResumeData(prev => {
      if (subSection) {
        const newProjects = [...prev[section]];
        newProjects[newProjects.length - 1][subSection].push('');
        return { ...prev, [section]: newProjects };
      } else {
        return { ...prev, [section]: [...prev[section], ''] };
      }
    });
  };

  const removeField = (section, index, subSection) => {
    setResumeData(prev => {
      if (subSection) {
        const newProjects = [...prev[section]];
        newProjects[newProjects.length - 1][subSection].splice(index, 1);
        return { ...prev, [section]: newProjects };
      } else {
        return { ...prev, [section]: prev[section].filter((_, i) => i !== index) };
      }
    });
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { name: '', description: '', highlights: [''] }
      ]
    }));
  };

  const downloadPDF = async () => {
    const element = resumeRef.current;
    const canvas = await toPng(element, { quality: 0.95 });
    const pdf = new jsPDF();
    
    const imgProperties = pdf.getImageProperties(canvas);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    
    pdf.addImage(canvas, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('fresher-resume.pdf');
  };

  return (
    <div className=' bg-black '>
    <Header/>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 pb-5">
        
      <div className="space-y-4 h-[150vh] overflow-y-scroll p-2 ">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={resumeData.name} onChange={handleInputChange} />
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={resumeData.phone} onChange={handleInputChange} />
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" value={resumeData.email} onChange={handleInputChange} />
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" name="linkedin" value={resumeData.linkedin} onChange={handleInputChange} />
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={resumeData.title} onChange={handleInputChange} />
            <Label htmlFor="summary">Summary</Label>
            <Textarea id="summary" name="summary" value={resumeData.summary} onChange={handleInputChange} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <Input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleInputChange(e, 'education', index, 'degree')}
                  className="mb-1"
                />
                <Input
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleInputChange(e, 'education', index, 'institution')}
                  className="mb-1"
                />
                <Input
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => handleInputChange(e, 'education', index, 'year')}
                  className="mb-1"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  value={skill}
                  onChange={(e) => handleInputChange(e, 'skills', index)}
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeField('skills', index)}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addField('skills')}>
              <PlusCircle className="h-4 w-4 mr-2" /> Add Skill
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {resumeData.projects.map((project, projectIndex) => (
              <div key={projectIndex} className="mb-4 p-4 border rounded">
                <Input
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) => handleInputChange(e, 'projects', projectIndex, 'name')}
                  className="mb-2"
                />
                <Textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => handleInputChange(e, 'projects', projectIndex, 'description')}
                  className="mb-2"
                />
                {project.highlights.map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="flex items-center mb-2">
                    <Input
                      placeholder="Project Highlight"
                      value={highlight}
                      onChange={(e) => handleInputChange(e, 'projects', projectIndex, 'highlights')}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeField('projects', highlightIndex, 'highlights')}>
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => addField('projects', 'highlights')}>
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Highlight
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addProject}>
              <PlusCircle className="h-4 w-4 mr-2" /> Add Project
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            {resumeData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  value={achievement}
                  onChange={(e) => handleInputChange(e, 'achievements', index)}
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeField('achievements', index)}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addField('achievements')}>
              <PlusCircle className="h-4 w-4 mr-2" /> Add Achievement
            </Button>
          </CardContent>
        </Card>

      </div>

      <div ref={resumeRef} className="bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center">{resumeData.name}</h1>
        <p className="text-center text-sm mt-2">
          📞: {resumeData.phone} | 📧: {resumeData.email} | 🔗 LinkedIn: {resumeData.linkedin}
        </p>
        <h2 className="text-xl font-bold mt-4 border-b-2 border-gray-300">{resumeData.title}</h2>
        <p className="mt-2 text-sm">{resumeData.summary}</p>

        <h3 className="text-lg font-semibold mt-4">EDUCATION </h3>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mt-2">
            <div><strong>{edu.degree}</strong></div>
            <div>{edu.institution}, {edu.year},  CGPA {edu.CGPA}</div>
          </div>
        ))}

        <h3 className="text-lg font-semibold mt-4">SKILLS</h3>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">{skill}</span>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-4">PROJECTS</h3>
        {resumeData.projects.map((project, index) => (
          <div key={index} className="mt-2">
            <div><strong>{project.name}</strong></div>
            <p className="text-sm">{project.description}</p>
            <ul className="list-disc list-inside">
              {project.highlights.map((highlight, highlightIndex) => (
                <li key={highlightIndex} className="text-sm">{highlight}</li>
              ))}
            </ul>
          </div>
        ))}

        <h3 className="text-lg font-semibold mt-4">ACHIEVEMENTS</h3>
        <ul className="list-disc list-inside">
          {resumeData.achievements.map((achievement, index) => (
            <li key={index} className="text-sm">{achievement}</li>
          ))}
        </ul>
      
      </div>
      <Button
        onClick={downloadPDF}
        className="fixed bottom-4 right-4  text-white p-4 rounded-full shadow-lg "
      >
        Download Resume as PDF
      </Button>
    </div>
    </div>

  );
};

export default ResumeBuilder;