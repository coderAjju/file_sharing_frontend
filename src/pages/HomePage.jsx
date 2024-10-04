import { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import QRCode from 'qrcode';


function HomePage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState(null);

  const navigate = useNavigate();

  const canvasRef = useRef(null);

  const generateQRCode = async (url) => {
    try {
      await QRCode.toCanvas(canvasRef.current, url, { width:256 });
    } catch (error) {
      console.error("Error generating QR code", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
    setUploadProgress(0);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {

    //  first check user is authorized if authorized then only upload the file
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // check if the file size is greater than 15 MB
    const fileSize = selectedFiles.reduce((total, file) => total + file.size, 0);
    if (fileSize > 15 * 1024 * 1024) {
      toast.error("File size is greater than 15 MB");
      return;
    }
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      })
      setIsUploading(true);
      setUploadProgress(30); // Simulate upload progress
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/files/upload`, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            "name": "ajay upadhyay"
          }
        });
        setUploadProgress(100);
        setUploadedFiles(response.data.downloadUrl.url)
        generateQRCode(response.data.downloadUrl.url);
      } catch (error) {
        console.log(error);
        console.log("error while uploading file");
      }
      setIsUploading(false);
    } else {
      alert("Please select files to upload.");
    }
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
    <div className="flex flex-col">
      <Header />
      <div className=" mt-4 bg-gray-900 text-white flex flex-col justify-center items-center p-4 sm:p-8">
        <div className="w-full max-w-2xl p-4 sm:p-10 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
          <h1 className="text-4xl font-semibold text-center text-gray-100 mb-8">
            Share Your Media Files
          </h1>
          <p className="text-lg text-gray-400 mb-6 text-center">
            Drag and drop or select your images and videos to share.
          </p>

          <div className="relative w-full max-w-lg mx-auto bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-600 transition duration-300"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <FiUploadCloud className="text-6xl text-gray-400 mb-4" />
            <p className="text-gray-400">Drag & drop files here or</p>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              name='files'
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="mt-4 cursor-pointer bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Browse Files
            </label>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-6 space-y-4 w-full">
              <h3 className="text-lg font-semibold text-gray-300">Selected Files</h3>
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-between bg-gray-700 p-3 rounded-lg shadow-sm border border-gray-600"
                >
                  <div className=" flex w-[90%] items-center space-x-2">
                    {file.type.startsWith("image/") && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    {file.type.startsWith("video/") && (
                      <video
                        src={URL.createObjectURL(file)}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex sm:flex-row flex-col gap-2 w-full">
                      <p className="text-gray-300 sm:w-[65%] w-[72%] truncate">{file.name}</p>
                      <p className="text-gray-300 sm:inline sm:ms-4 sm:bg-gray-700">{((file.size / 1000 / 1000)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveFile(index)} className="mr-3">
                    <AiOutlineCloseCircle className="text-red-500 text-xl" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {isUploading && (
            <div className="mt-6 w-full bg-gray-600 rounded-full h-4">
              <div
                className="bg-indigo-600 h-4 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          <button
            onClick={handleUpload}
            className={`w-full mt-8 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 ${isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Files"}
          </button>

          {/* QR Code */}
          <div className="mt-4 flex justify-center">
            {uploadedFiles &&
              <canvas ref={canvasRef}></canvas>
            }
          </div>
          <div>
            {selectedFiles.length > 0 && uploadedFiles && (
              <div className="mt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={uploadedFiles}
                    readOnly
                    className="border border-gray-300 p-2 w-full rounded bg-gray-50 text-black"
                  />
                  <button
                    onClick={() => copyToClipboard(uploadedFiles)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;