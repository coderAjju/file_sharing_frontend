import React, { useEffect, useState } from 'react'
import Navbar from '../components/Header'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DownloadPage = () => {
    const {token} = useParams();
    const [urls, setUrls] = useState(null)
    useEffect(() =>{
        fetchUrls();
    },[]);
    const fetchUrls = async ()=>{
        try {
            const response = await axios.get(`http://localhost:5000/api/files/download/${token}`);   
            setUrls(response.data.urls)
        } catch (error) {
            console.error(error)
            alert("Failed to download file")
        }
    }
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 justify-center flex-col gap-3 items-center">
        {
            urls && urls.map(url=>(
              <>
                <a href={url} target="_blank" rel="noopener noreferrer" key={url} download={url}>
                    <button className='py-2 px-3 bg-purple-600 text-white font-bold rounded'>Download</button>
                </a>
              </>
            ))  || <div className='loader'></div>  // Display loading message while fetching data
        }
      </div>
    </div>
  )
}

export default DownloadPage