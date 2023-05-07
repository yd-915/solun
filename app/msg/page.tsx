"use client";

import { useState } from 'react';

function CreateMessage() {
  const [bruteforceSafe, setBruteforceSafe] = useState(false);
  const [exampleLink, setExampleLink] = useState('A7bDg');

  const handleBruteforceToggle = () => {
    setBruteforceSafe(!bruteforceSafe);
    if (!bruteforceSafe) {
      setExampleLink('FghsaTG2t1dfjkl4elf85rkFlhiT9wiFmvkkeE751hJFGk518kl5fglvbnxjUkKJGurm845qmF82mF82kLc1m5GGMs');
    } else {
      setExampleLink('A7bDg');
    }
  };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
        message: { value: string };
        bruteforceSafe: { checked: boolean };
        };
        const message = target.message.value;
        const bruteforceSafe = target.bruteforceSafe.checked;
        const data = {
        message,
        bruteforceSafe,
        };
        fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then((data) => {
            // if response code is 200, show generated link to user
            if (data.code === 200) {
                // TODO: show link to user and let him copy it
            }
        })
        .catch((err) => {
            console.error(err);
        });
    };

  return (
    <div className="flex items-center justify-center py-8 md:min-h-screen">
      <div className="bg-slate-800 p-5 rounded-lg shadow-md w-full max-w-md md:mb-96 mb-40">
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
      </div>
    </div>
  );
}

export default CreateMessage;