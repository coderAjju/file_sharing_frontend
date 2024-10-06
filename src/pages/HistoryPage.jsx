import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const HistoryPage = () => {
    const [fileHistory, setFileHistory] = useState([]);
    let token = localStorage.getItem('token');
    const fetchHistory = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/files/history`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            setFileHistory(response.data.files);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchHistory();
    }, [fileHistory]);

    // -----------implemention of image deletion after 1 hour autmatically started ---------------
    const deleteExpiredFiles = async (fileHistory) => {
        const loginTimestamp = localStorage.getItem('loginTimestamp');
        const currentTime = Date.now();
        const oneHourInMilliseconds = 60 * 1000;

        if (loginTimestamp && (currentTime - parseInt(loginTimestamp) > oneHourInMilliseconds)) {
            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/files/delete`, {
                    fileHistory,
                }, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                setFileHistory([]);
                localStorage.removeItem('loginTimestamp');
                localStorage.removeItem('expiresAt');
            } catch (error) {
                console.error('Error deleting expired files:', error);
            }
        }
    };

    useEffect(() => {
        deleteExpiredFiles(fileHistory);
        const interval = setInterval(deleteExpiredFiles, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [fileHistory]);
    // ------------implementation of image deletion after 1 hour automatically ended ----------------

    if (fileHistory.length > 0) {
        fileHistory.forEach(file => {
            setInterval(() => {
                if (file.createdAt + 60000 < Date.now()) {
                    handleDelete(file._id);
                }
            }, 60000);
        });
    }



    const handleDelete = async (fileId) => {
        toast.info("Deleting...", {
            autoClose: 1000,
        });
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/files/delete/${fileId}`, {
                method: 'DELETE',
                credentials: 'include', // Include credentials for cookies
            });

            if (response.ok) {
                // Remove the deleted file from state
                setFileHistory((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
                toast.success("File deleted successfully");
            } else {
                toast.error("Failed to delete file");
            }
        } catch (error) {
            console.error('Error deleting file:', error);
            toast.error("Error deleting file");
        }
    };
    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            toast.success("URL copied to clipboard")
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">File Sharing History</h2>

                {fileHistory.length === 0 ? (
                    <p className="text-center text-red-500 text-lg">No files shared yet.</p>
                ) : (
                    <div className="space-y-6">
                        {fileHistory.map((file, index) => (
                            <div
                                key={file._id}
                                className="bg-gray-800 rounded-lg shadow-lg p-2 sm:p-6 space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[13px] sm:text-sm text-gray-400">
                                            Shared on: {new Date(file.createdAt).toLocaleString()}
                                        </p>
                                        <h3 className=" text-[18px] sm:text-xl font-semibold">
                                            File {index + 1}
                                        </h3>
                                    </div>
                                    <div>
                                        <span className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-lg text-sm">
                                            Total Files: {file.filesName.length}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {file.filesName.map((name, idx) => (
                                        <div key={idx} className="flex justify-between items-center">
                                            <p className="font-medium">{name}</p>
                                            <a
                                                href={file.fileUrl[idx]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:underline"
                                            >
                                                View / Download
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleDelete(file._id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => copyToClipboard(file.downloadUrl)}
                                    className=" ms-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Copy
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default HistoryPage;
