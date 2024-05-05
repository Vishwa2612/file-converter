import React from 'react';

const Main: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black w-screen">
      <p className="text-6xl text-green-500 font-extrabold mb-4">Convert your</p>
      <p className="text-6xl text-white font-extrabold mb-8">your file</p>
      <div className="text-center">
        <p className="text-2xl text-white">Simply upload your file and convert into any file you need</p>
      </div>
    </div>
  );
};

export default Main;
