import React, { useState } from 'react';
import axios from 'axios';
function FileUploader() {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState(null);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setFiles(files);
    };


    const handleUpload = async () => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);  // Field name 'files' here
        });
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/files/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadedFiles(response.data.downloadUrl.url)
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
        
    };

     // Copy the URL to the clipboard
     const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            alert('URL copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };


    return (
        <div className="flex justify-center items-center flex-col">
            <div className='flex justify-center'>
            <label
                className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {loading ? (
                    <div className="flex items-center">
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Uploading...
                    </div>
                ) : (
                    <span>Upload File</span>
                )}
                <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    name='files'
                    multiple
                    accept="image/*,video/*"
                />
            </label>
            {files && (
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
                    onClick={handleUpload}
                >
                    Upload
                </button>
            )}
            </div>
           {/* Uploaded File URL */}
      <div>
      {uploadedFiles && (
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={uploadedFiles}
              readOnly
              className="border border-gray-300 p-2 w-full rounded bg-gray-50"
            />
            <button
              onClick={()=>copyToClipboard(uploadedFiles)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Copy
            </button>
          </div>
        </div>
      )}
      </div>
        </div>
    );
}

export default FileUploader;