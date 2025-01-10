import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error400 = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-base-content">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-error">400</h1>
        <h2 className="text-3xl font-semibold mt-4">Bad Request</h2>
        <p className="mt-2 text-lg">
          The request could not be understood or was missing required parameters.
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

export default Error400;
