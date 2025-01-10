import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-base-content">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-error">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
        <p className="mt-2 text-lg">
          Sorry, the page you are looking for does not exist or has been moved.
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

export default Error404;
