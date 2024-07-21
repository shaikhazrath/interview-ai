import React, { useState } from 'react';
import { Twitter, Linkedin, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your server
    console.log('Feedback submitted:', feedback);
    setFeedback('');
    // You might want to show a success message to the user here
  };

  return (
    <footer className=" mt-5 py-12 ">
      <div className="container mx-auto px-4 r ">
        <div className="flex justify-center space-x-4 mb-4">
         
          <p className="text-center text-gray-400 text-xs  ">
            We'd love to hear from you! Please give us your feedback, report any bugs, or rate our service. Stay connected with us on social networks.
          </p>
          <a href="https://x.com/shaikhazrathali" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Twitter size={24} />
          </a>
          <a href="https://www.linkedin.com/in/shaik-hazrathali-856349253" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin size={24} />
          </a>
        </div>
        <div className="mt-8 pt-8 border-gray-700 text-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} InterviewAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;