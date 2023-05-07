import React from 'react';

const CTABanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left text-white mb-4 md:mb-0">
            <h2 className="text-3xl font-bold">Ready to experience Solun?</h2>
            <p className="text-xl">Join us today and enjoy the benefits of a secure and private communication platform.</p>
          </div>
          <button className="bg-white text-blue-700 font-semibold py-3 px-6 rounded hover:bg-blue-100 transition duration-200">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default CTABanner;