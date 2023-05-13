"use client";

import { useEffect, useState } from "react";

function ViewMessage({ params }: { params: { data: string[] } }) {

  const id = params.data[0];
  const secret = params.data[1];

  const [passwordProtected, setPasswordProtected] = useState(false);
  const [messageExists, setMessageExists] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function checkId(id: string) {
    const data = {
      id,
    };
    const res = await fetch("/api/message/check", {
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
      setMessageExists(false);
    } else {
      setMessageExists(true);
      setPasswordProtected(result.password);
    }
  }

  async function deleteMessage(id: string) {
    const data = {
      id,
    };
    const res = await fetch("/api/message/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await res.json();
    if (!res.ok) {
      document.getElementById("deletionField")!.innerHTML =
        "Message could not be deleted.";
    } else {
      document.getElementById("deletionField")!.innerHTML =
        "Message got deleted from the system.";
    }
  }

  async function handleViewMessage(secretKey: string) {
    setLoading(true);
    setError("");
    const data = {
      id,
      password,
      secret: secretKey,
    };
    const res = await fetch("/api/message/receive", {
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
      setMessage(result.message);
      setShowMessage(true);

      await deleteMessage(id);
    }
    setLoading(false);
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
      return "View Message";
    }
  }

  return (
    <div className="flex items-center justify-center py-8 px-2 md:min-h-screen">
      <div className="bg-slate-800 p-5 rounded-lg shadow-md w-full max-w-md md:mb-96 mb-40">
        {messageExists ? (
          showMessage ? (
            <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-100">
              Your Message
            </h1>
            <textarea
              className="bg-slate-950 text-white textarea w-full p-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:shadow-md focus:shadow-blue-700 transition duration-200"
              readOnly
              value={message}
              rows={6}
            />
            <div className="flex justify-center italic items-center mt-4 flex-wrap">
              <p id="deletionField" className="text-red-500 text-center mb-4"></p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded transition duration-200 shadow-md ml-2 mt-2"
                onClick={() => {
                  location.href = "/msg";
                }}
              >
                Create New Message
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
                onClick={() => handleViewMessage(secret)}
                disabled={loading}
              >
                {renderButtonContent()}
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded transition duration-200 shadow-md mt-2"
                onClick={() => handleViewMessage(secret)}
                disabled={loading}
              >
                {renderButtonContent()}
              </button>
            </div>
          )
        ) : (
          <p id="notFoundField" className="text-white">Checking your link...</p>
        )}
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default ViewMessage;
