import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error500 = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-base-content">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-error">500</h1>
        <h2 className="text-3xl font-semibold mt-4">Internal Server Error</h2>
        <p className="mt-2 text-lg">
          Something went wrong on our end. Please try again later.
        </p>
        <button
          className="btn btn-primary mt-6"
          onClick={() => navigate('/')} // Navigate to the home page
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Error500;
