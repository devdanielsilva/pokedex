"use client";

import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-solid border-current border-t-transparent text-blue-600 rounded-full"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
