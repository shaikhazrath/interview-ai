import React from 'react';
import { Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-5 py-12  text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <p className="text-center text-gray-400 text-sm mb-4 max-w-2xl">
            We&apos;d love to hear from you! Please give us your feedback, report any bugs, or rate our service. Stay connected with us on social networks.
          </p>
          <div className="flex space-x-4">
            <a href="https://x.com/shaikhazrathali" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={24} />
            </a>
            <a href="https://www.linkedin.com/in/shaik-hazrathali-856349253" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} InterviewAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;