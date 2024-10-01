import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    <Header/>
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-200 text-center mb-8">Downloadable Files</h2>
      {urls && urls ? <div className="flex flex-col space-y-4">
        {urls.map((url,index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex justify-between items-center"
          >
            <h3 className="text-xl font-semibold text-gray-200">{url.fileName}</h3>
            <a
              href={url.url}
              download={url.url}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Download
            </a>
          </div>
        ))}
      </div> : <h1 className='text-red-500 text-xl text-center'>Files are deleted from database request sender to resend the files</h1>}
    </div>
    </>
  );
};

export default DownloadPage;