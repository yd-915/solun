"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <p className="text-2xl text-white mt-4">Oops! It looks like this page got lost in the digital void.</p>
        <button
          className="mt-6 px-4 py-2 rounded bg-white text-primary font-semibold hover:bg-opacity-80 transition duration-200"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;