import React from 'react';
import Navbar from '../components/Header';
import FileUploader from '../components/FileUploader';

function HomePage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center items-center">
        <FileUploader />
      </div>
      
    </div>
  );
}

export default HomePage;