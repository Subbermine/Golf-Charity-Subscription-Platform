import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4">
      <h1 className="text-9xl font-display font-black text-slate-200">404</h1>
      <h2 className="text-3xl font-display font-bold text-slate-800 mt-4 mb-2">Page Not Found</h2>
      <p className="text-slate-600 mb-8 max-w-md text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-slate-800 transition-colors">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
