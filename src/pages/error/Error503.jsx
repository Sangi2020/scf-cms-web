import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error503 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-base-content">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-error">503</h1>
        <h2 className="text-3xl font-semibold mt-4">Service Unavailable</h2>
        <p className="mt-2 text-lg">
          Our servers are currently down for maintenance. Please try again later.
        </p>
        <button
          className="btn btn-primary mt-6"
          onClick={() => navigate('/')} 
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Error503;
