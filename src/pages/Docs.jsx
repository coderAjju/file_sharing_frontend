import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Documentation = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-3 sm:p-6">
      <h1 className="ms:text-3xl text-2xl font-bold text-white mb-6">File Sharing Web App Documentation</h1>
      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-3xl">
        
        <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4">How This Web App Works</h2>
        <p className="text-gray-300 mb-4">
          Our file-sharing web app allows you to upload and share images and videos seamlessly. 
          All your files will be securely stored on Cloudinary for 1 hour. If you wish to delete them within that time, 
          you can do so easily. If not, files will automatically be deleted after 1 hour.
        </p>
        <p className="text-gray-300 mb-4">
  In this project, we have utilized Cloudinary, which specializes in storing images and videos. 
  As a result, sharing files in other formats, such as PDFs or documents, is not supported.
  Please ensure that you are only uploading image and video files.
</p>

        <h2 className="text-2xl font-bold text-blue-400 mb-4">File Size Restrictions</h2>
        <p className="text-gray-300 mb-4">
          Please note that the maximum file size for uploads is <span className="font-semibold">15 MB</span>.
          Ensure that your files are within this limit to avoid upload errors.
        </p>

        <h2 className="text-2xl font-bold text-blue-400 mb-4">Features</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          <li>Upload files up to 15 MB</li>
          <li>Share files easily via generated links</li>
          <li>Download files directly from the app</li>
          <li>Secure temporary storage on Cloudinary</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-400 mb-4">Getting Started</h2>
        <p className="text-gray-300 mb-4">
          To get started, simply use the upload feature on the homepage. 
          After uploading your files, you'll receive a shareable link to send to others.
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Documentation;
