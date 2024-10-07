import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';

const DownloadPage = () => {

  const {token} = useParams();
  const [urls, setUrls] = useState(null)
  useEffect(() =>{
      fetchUrls();
  },[]);
  const fetchUrls = async ()=>{
      try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/files/download/${token}`);   
      
        // collect url and file names in json format
        const urlsAndNames = response.data.urls.map((url,index)=>(
          {id:index,url, fileName:response.data.fileNames[index]}
        ))
        setUrls(urlsAndNames)

      } catch (error) {
          console.log(error);
          alert("Request sender to resend the file")
      }
  }

  return (
    <>
    <nav className="flex justify-start items-center py-4 px-2 md:px-10  md:py-6 lg:py-8">
      <Link to={"/"} className="flex items-center">
        <img src="/assets/logo.png" className='w-36' alt="" />
      </Link>
    </nav>
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-200 text-center mb-8">Downloadable Files</h2>
      {urls ? (urls ? <div className="flex flex-col space-y-4">
        {urls.map((url,index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-md p-2 sm:p-4 flex-col sm:flex-row hover:shadow-lg transition-shadow duration-300 flex justify-start sm:gap-0 gap-2 sm:justify-between items-center"
          >
            <h3 className="text-xl break-words font-semibold text-gray-200">{url.fileName}</h3>
            <a
              href={url.url}
              download={url.url}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Download
            </a>
          </div>
        ))}
      </div> : <h1 className='text-red-500 text-xl text-center'>Files are deleted from database request sender to resend the files</h1>)
      :
      <h1 className='text-xl text-white text-center'>Loading...</h1>
      }
    </div>
    </>
  );
};

export default DownloadPage;