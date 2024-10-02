import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const HistoryPage = () => {
    const [fileHistory, setFileHistory] = useState([]);
    const [deleteBtn, setDeleteBtn] = useState(false);
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
    }, []);

    const handleDelete = async (fileId) => {
        setDeleteBtn(true);
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
          alert('URL copied to clipboard');
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
      };
    console.log(fileHistory);
    return (
        <>
            <Header />
            <div className="bg-gray-900 text-white p-4 sm:p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">File Sharing History</h2>

                {fileHistory.length === 0 ? (
                    <p className="text-center text-lg">No files shared yet.</p>
                ) : (
                    <div className="space-y-6">
                        {fileHistory.map((file, index) => (
                            <div
                                key={file._id}
                                className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Shared on: {new Date(file.createdAt).toLocaleString()}
                                        </p>
                                        <h3 className="text-xl font-semibold">
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
                                    {deleteBtn ? "Deleting..." : "Delete"}
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
