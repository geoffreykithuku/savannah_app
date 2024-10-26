import React from 'react';
import { HashLoader } from 'react-spinners';

const LoadingSpinner = ({ loading, size = 50, color = '#351D5B' }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <HashLoader color={color} size={size} loading={loading} />
    </div>
  );
};

export default LoadingSpinner;
