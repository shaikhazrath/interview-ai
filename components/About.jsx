import React from 'react';
import Header from './header';

const AboutPage = () => {
  return (
    <div className='bg-black'>
      <Header/>
      <div className="px-4 py-8 bg-black shadow-lg text-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-gray-100 border-b border-gray-700 pb-2">About</h2>
        <div className="space-y-6">
          <p className="leading-relaxed">
            The services provided on this website are intended for practice and educational purposes only. While our platform aims to help users prepare for interviews and boost their confidence, we make no guarantees or representations that the questions and scenarios presented will be asked in actual interviews.
          </p>
          
          <section>
            <h3 className="text-xl font-semibold mb-2 text-gray-200">Accuracy of Content</h3>
            <p className="leading-relaxed">
              The questions and interview scenarios generated by our platform are designed to simulate real-world interviews as closely as possible. However, the content may not accurately reflect the specific questions or situations you will encounter in actual interviews. The platform is intended to provide a general sense of interview practice and should not be relied upon as a sole resource for preparation.
            </p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-2 text-gray-200">No Guarantee of Success</h3>
            <p className="leading-relaxed">
              Using our platform does not guarantee success in actual interviews. Interview success depends on a variety of factors including individual performance, the specific requirements of the job, and the interviewer&apos;s preferences. Our platform is one of many tools you can use to prepare, and we recommend supplementing your practice with other resources.
            </p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-2 text-gray-200">User Responsibility</h3>
            <p className="leading-relaxed">
              It is the user&apos;s responsibility to use the platform ethically and responsibly. We encourage users to use the platform as a supplementary tool to improve their interviewing skills and boost their confidence. Users should seek additional resources and professional guidance to ensure comprehensive preparation.
            </p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-2 text-gray-200">Limitation of Liability</h3>
            <p className="leading-relaxed">
              Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the website or reliance on any information provided on the website. Your use of the website and your reliance on any information on the website is solely at your own risk.
            </p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-2 text-gray-200">Changes to Disclaimer</h3>
            <p className="leading-relaxed">
              We reserve the right to modify this disclaimer at any time. Any changes will be updated on this page, and it is your responsibility to review this disclaimer periodically to stay informed of any updates.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
