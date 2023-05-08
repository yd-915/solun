"use client";

import { useState } from 'react';

function CreateMessage() {
  const [bruteforceSafe, setBruteforceSafe] = useState(false);
  const [exampleLink, setExampleLink] = useState('A7bDg');

  const [messageCreated, setMessageCreated] = useState(false);
  const [messageLink, setMessageLink] = useState('');


  const handleBruteforceToggle = () => {
    setBruteforceSafe(!bruteforceSafe);
    if (!bruteforceSafe) {
      setExampleLink('FghsaTG2t1dfjkl4elf85rkFlhiT9wiFmvkkeE751hJFGk518kl5fglvbnxjUkKJGurm845qmF82mF82kLc1m5GGMs');
    } else {
      setExampleLink('A7bDg');
    }
  };

    const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
          message: { value: string };
          bruteforceSafe: { checked: boolean };
        };

        // Set Button disabled and add loading animation and text "Creating Message"
        const submitButton = document.getElementById('submit') as HTMLButtonElement;
        submitButton.disabled = true;
        submitButton.innerHTML = '<div class="flex items-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span class="text-white">Creating</span></div>';

        const message = target.message.value;
        const bruteforceSafe = target.bruteforceSafe.checked;
        const data = {
          message,
          bruteforceSafe,
        };
          const res = await fetch('/api/message/create', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
          })
          const result = await res.json();
          if(!res.ok) {
              console.log(result.message)
              submitButton.disabled = false;
              submitButton.innerHTML = '<div class="flex items-center"><svg class="animate-error-cross mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18L18 6M6 6l12 12"></path></svg><span class="text-white">Error</span></div>';
          } else {
              setMessageCreated(true);
              setMessageLink(result.link);
          }
    };

  return (
    <div className="flex items-center justify-center py-8 px-2 md:min-h-screen">
      <div className="bg-slate-800 p-5 rounded-lg shadow-md w-full max-w-md md:mb-96 mb-40">
        {!messageCreated ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-gray-100">
              New Message
            </h1>
            <form onSubmit={handleSubmit}>
              <div id="pad">
                <textarea
                  className="bg-slate-950 text-white textarea w-full p-2 border-2 border-blue-500 rounded-lg"
                  name="message"
                  id="message"
                  placeholder="Write down your private message..."
                  rows={6}
                  minLength={1}
                ></textarea>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="bruteforceSafe"
                    className="mr-2"
                    onChange={handleBruteforceToggle}
                  />
                  <label htmlFor="bruteforceSafe" className="text-white">
                    Bruteforce Safe (90 Chars)
                  </label>
                </div>
                <button
                  type="submit"
                  id="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded transition duration-200 shadow-md ml-2"
                >
                  Create Message
                </button>
              </div>
              <div className="mt-4">
                <span className="text-slate-300">Example Link:</span>
                <br />
                <span className="text-slate-400">solun.pm/msg/</span>
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
                Your Message has been created
              </h1>
              <div className="mb-4">
                <input
                  type="text"
                  value={`${messageLink}`}
                  readOnly
                  className="bg-slate-950 text-white w-full p-2 rounded-lg"
                />
              </div>
              <button
                id="copy"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded transition duration-200 shadow-md ml-2"
                onClick={() => {
                  navigator.clipboard.writeText(`${messageLink}`);
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

export default CreateMessage;