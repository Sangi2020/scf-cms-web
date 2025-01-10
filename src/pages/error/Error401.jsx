import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error401 = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-base-content">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-error">401</h1>
        <h2 className="text-3xl font-semibold mt-4">Unauthorized</h2>
        <p className="mt-2 text-lg">
          You are not authorized to view this page. Please log in.
        </p>
        <button
          className="btn btn-primary mt-6"
          onClick={() => navigate('/login')} // Navigate to login page
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Error401;
