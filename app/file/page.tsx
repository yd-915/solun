"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faQuestionCircle, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'

function UploadFile() {
  const [bruteforceSafe, setBruteforceSafe] = useState(false);
  const [exampleLink, setExampleLink] = useState('A7bDg');

  const [uploadCreated, setUploadCreated] = useState(false);
  const [uploadLink, setUploadLink] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleBruteforceToggle = () => {
    setBruteforceSafe(!bruteforceSafe);
    if (!bruteforceSafe) {
      setExampleLink('FghsaTG2t1dfjkl4elf85rkFlhiT9wiFmvkkeE751hJFGk518kl5fglvbnxjUkKJGurm845qmF82mF82kLc1m5GGMs');
    } else {
      setExampleLink('A7bDg');
    }
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (event : any) => {
    setPassword(event.target.value);
  };

  const MAX_FILE_SIZE = 2.5 * 1024 * 1024 * 1024; // 2.5GB in bytes

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]; // assuming single file upload
    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds the maximum limit of 2.5GB");
      return;
    }
    setFiles([file]);
  };
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      bruteforceSafe: { checked: boolean };
      password: { value: string };
      endToEndEncryption: { checked: boolean };
      autoDeletion: { value: string };
    };

    const submitButton = document.getElementById('submit') as HTMLButtonElement;
    submitButton.disabled = true;
    submitButton.innerHTML = '<div class="flex items-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span class="text-white">Uploading</span></div>';

    const bruteforceSafe = target.bruteforceSafe.checked;
    const password = target.password.value;
    const endToEndEncryption = target.endToEndEncryption.checked;

    if (files.length > 0) {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('bruteforceSafe', bruteforceSafe.toString());
      formData.append('password', password);
      formData.append('endToEndEncryption', endToEndEncryption.toString());
      formData.append('autoDeletion', target.autoDeletion.value);
      
      try {
        const response = await fetch('/api/file/upload', {
          method: 'POST',
          body: formData,
        });
        
        const data = await response.json();
        if (response.ok) {
          setUploadLink(data.link);
          setUploadCreated(true);
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.log(err);
        alert('An error occurred while uploading the file.');
      }
    }
    submitButton.disabled = false;
    submitButton.innerHTML = 'Start Upload';
  };


  return (
    <div className="flex items-center justify-center py-8 px-2 md:min-h-screen">
      <div className="bg-slate-800 p-5 rounded-lg shadow-md w-full max-w-md md:mb-96 mb-40">
        {!uploadCreated ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-gray-100">
              Upload File
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center border-2 border-blue-500 h-64 rounded-2xl mb-4">
                <input
                  type="file"
                  name="files"
                  id="files"
                  accept="*"
                  className="absolute opacity-0 h-64 w-full max-w-sm cursor-pointer"
                  onChange={handleFileChange}
                />
                <FontAwesomeIcon icon={faCloudUploadAlt} size="6x" color="#3B82F6" />
              </div>
              {files.length > 0 && (
                <div className="mt-4">
                  <span className="text-slate-300">Selected File:</span>
                  <br />
                  <span className="text-slate-400">Name: {files[0].name}</span>
                  <br />
                  <span className="text-slate-400">Size: {(files[0].size / 1000000).toFixed(2)} MB</span>
                </div>
              )}
              <div className="flex justify-between items-center mt-4">
                <div className="relative flex items-center">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    className="bg-slate-950 text-white rounded-lg block p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:shadow-md focus:shadow-blue-700 transition duration-200"
                    placeholder="Optional Password"
                    minLength={1}
                    onChange={handlePasswordChange}
                  />
                  {password.length > 0 && (
                  <div className="h-6 w-6 text-slate-300 absolute right-2">
                    <FontAwesomeIcon id="pwd-icon" icon={passwordVisible ? faEye : faEyeSlash}
                    onClick={handlePasswordVisibility}
                    />
                  </div>
                  )}
                </div>
                <button
                  type="submit"
                  id="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded transition duration-200 shadow-md ml-2"
                >
                  {!uploadCreated ? 'Start Upload' : `Uploading...`}
                </button>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="bruteforceSafe"
                  onChange={handleBruteforceToggle}
                  className="mr-2 w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
                <label htmlFor="bruteforceSafe" className="text-white">
                  Bruteforce Safe (90 Chars)
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="endToEndEncryption"
                  className="mr-2 w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
                <label htmlFor="endToEndEncryption" className="text-white">
                  End-to-End Encryption
                </label>
              </div>
              <div className="flex flex-col mt-4">
                <div className="relative">
                  <select
                    name="autoDeletion"
                    id="autoDeletion"
                    className="bg-slate-950 text-white rounded-lg block p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:shadow-md focus:shadow-blue-700 transition duration-200"
                  >
                    <option selected disabled hidden value="download">Choose Auto Deletion</option>
                    <option value="download">1 Download</option>
                    <option value="1d">1 Day</option>
                    <option value="1w">1 Week</option>
                    <option value="1m">1 Month</option>
                    <option value="3m">3 Months</option>
                    <option value="6m">6 Months</option>
                    <option value="1y">1 Year</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-slate-300">Example Link:</span>
                <br />
                <span className="text-slate-400">solun.pm/file/</span>
                <a
                  rel="noopener noreferrer"
                  className="text-blue-600 break-all"
                >
                  {exampleLink}
                </a>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 text-gray-100">
              Your File has been uploaded
            </h1>
            <div className="mb-4">
              <input
                type="text"
                value={`${uploadLink}`}
                readOnly
                className="bg-slate-950 text-white w-full p-2 rounded-lg blur-[3px] hover:blur-none transition duration-300 focus:outline-none"
              />
            </div>
            <button
              id="copy"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded transition duration-200 shadow-md ml-2"
              onClick={() => {
                navigator.clipboard.writeText(`${uploadLink}`);
                const copyButton = document.getElementById('copy') as HTMLButtonElement;
                copyButton.innerHTML = "Copied!";
                setTimeout(() => {
                  copyButton.innerHTML = "Copy Link";
                }, 1200);
              }}
            >
              Copy Link
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UploadFile;