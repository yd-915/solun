"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function ViewFile({ params }: { params: { data: string[] } }) {
  const id = params.data[0];
  const secret = params.data[1];

  const [passwordProtected, setPasswordProtected] = useState(false);
  const [fileExists, setFileExists] = useState(false);
  const [password, setPassword] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [file_raw_path, setFile_raw_path] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileType, setFileType] = useState("");
  const [showFile, setShowFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const uploadNewFile = () => {
    router.push("/file");
  };

  async function checkId(id: string) {
    const data = {
      id,
    };
    const res = await fetch("/api/file/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    const notFoundField = document.getElementById("notFoundField")!;
    if (!res.ok) {
      notFoundField.innerHTML = "Message not found.";
      setFileExists(false);
    } else {
      setFileExists(true);
      setPasswordProtected(result.password);
    }
  }

  async function deleteMessage(id: string, secretKey: string) {
    const data = {
      id,
      secret: secretKey,
    };
    const res = await fetch("/api/file/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      document.getElementById("deletionField")!.innerHTML = result.message;
    } else {
      document.getElementById("deletionField")!.innerHTML = result.message;
    }
  }

  async function handleViewFile(secretKey: string) {
    setLoading(true);
    setError("");
    const data = {
      id,
      password,
      secret: secretKey,
    };
    const res = await fetch("/api/file/receive", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      setError(result.message);
    } else {
      setFileLink(result.link);
      setFile_raw_path(result.file_raw_path);
      setFileName(result.name);
      setFileSize((result.size / 1000000).toFixed(2) + " MB");
      setFileType(result.type);
      setShowFile(true);

      await deleteMessage(id, secretKey);
    }
    setLoading(false);
  }


  async function handleDownloadFile(id: string, secretKey: string) {
    const downloadButton = document.getElementById("downloadButton") as HTMLButtonElement;
    downloadButton.disabled = true;
    downloadButton.innerHTML = '<div class="flex items-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span class="text-white">Downloading</span></div>';
    const data = {
      id,
      secret: secretKey,
    };
    const res = await fetch("/api/file/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      downloadButton.disabled = false;
      downloadButton.innerHTML = "Download File";
      return;
    }
  
    const result = await res.json();
    const decryptedFileDataHex = result.fileData;
    const fileName = result.file_name;

    const decryptedFileData = Buffer.from(decryptedFileDataHex, 'base64');
    const arrayBuffer = decryptedFileData.buffer.slice(decryptedFileData.byteOffset, decryptedFileData.byteOffset + decryptedFileData.byteLength);
    const blob = new Blob([arrayBuffer]);    
  
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
  
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
  
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
    
    downloadButton.disabled = false;
    downloadButton.innerHTML = "Download File";
  }

  useEffect(() => {
    checkId(id);
  }, []);

  function renderButtonContent() {
    if (loading) {
      return (
        <div className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-white">Loading</span>
        </div>
      );
    } else {
      return "View File";
    }
  }

  return (
    <div className="flex items-center justify-center py-8 px-2 md:min-h-screen">
      <div className="bg-slate-800 p-5 rounded-lg shadow-md w-full max-w-md md:mb-96 mb-40">
        {fileExists ? (
          showFile ? (
            <div>
                <h1 className="text-2xl font-bold mb-4 text-gray-100">
                  Your File
                </h1>
                <div className="p-4 mb-4 text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-800">
                  <p className="mb-2"><strong>Filename:</strong> {fileName}</p>
                  <p className="mb-2"><strong>Filesize:</strong> {fileSize}</p>
                  <p className="mb-2"><strong>Filetype:</strong> {fileType}</p>
                </div>
                <div className="flex justify-center">
                  <a
                    id="downloadButton"
                    onClick={() => {
                      handleDownloadFile(id, secret);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg px-8 py-4 rounded transition duration-200 shadow-lg inline-block text-center cursor-pointer"
                  >
                    Download File
                  </a>
                </div>
                <div className="flex flex-col justify-center italic items-center mt-4 flex-wrap">
                  <p id="deletionField" className="text-red-500 text-center mb-4"></p>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-4 py-2 rounded transition duration-200 shadow-md ml-2 mt-2"
                    onClick={() => uploadNewFile()}
                  >
                    Upload another file
                  </button>
                </div>
              </div>          
          ) : passwordProtected ? (
            <div className="flex items-center justify-center flex-wrap flex-col">
              <h1 className="text-2xl font-bold mb-4 text-gray-100">
                Enter Password
              </h1>
              <input
                type="password"
                className="bg-slate-950 text-white rounded-lg block p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:shadow-md focus:shadow-blue-700 transition duration-200"
                placeholder="Password"
                minLength={1}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded transition duration-200 shadow-md ml-2 mt-2"
                onClick={() => handleViewFile(secret)}
                disabled={loading}
              >
                {renderButtonContent()}
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded transition duration-200 shadow-md mt-2"
                onClick={() => handleViewFile(secret)}
                disabled={loading}
              >
                {renderButtonContent()}
              </button>
            </div>
          )
        ) : (
          <p id="notFoundField" className="text-white">Checking your link...</p>
        )}
        {error && <p className="text-red-500 mt-2 text-center break-all">{error}</p>}
      </div>
    </div>
  );
}

export default ViewFile;