"use client";

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faQuestionCircle, faLink, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { encryptTransfer } from '@/utils/clientEncryption';
import generateAES from "@/utils/generateAES";
import generateID from "@/utils/generateId";
import generatePassword from '@/utils/generatePassword';
import Link from 'next/link';
import Header from '@/components/header'
import Footer from '@/components/footer'

function CreateMessage() {
  const [bruteforceSafe, setBruteforceSafe] = useState(false);
  const [exampleLink, setExampleLink] = useState('');
  const [endToEndEncryption, setEndToEndEncryption] = useState(false);

  const [messageCreated, setMessageCreated] = useState(false);
  const [messageLink, setMessageLink] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [securityIndicator, setSecurityIndicator] = useState("Not Secure");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleBruteforceToggle = () => {
    setBruteforceSafe(!bruteforceSafe);
  };

  const handleEndToEndToggle = () => {
    setEndToEndEncryption(!endToEndEncryption);
  };

  useEffect(() => {
    const generateLink = async () => {
      let link = '';

      if (bruteforceSafe) {
        const id = await generateID(true);
        link += id;
      } else {
        const id = await generateID(false);
        link += id;
      }

      if (endToEndEncryption) {
        const aesKey = await generateAES();
        link += `/${aesKey}`;
      }

      setExampleLink(link);
    };

    generateLink();
  }, [bruteforceSafe, endToEndEncryption]);

  useEffect(() => {
    if (endToEndEncryption || password !== "") {
      setSecurityIndicator("Secure");
    } else if (bruteforceSafe) {
      setSecurityIndicator("Okay");
    } else {
      setSecurityIndicator("Not Secure");
    }
  }, [bruteforceSafe, endToEndEncryption, password]);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (event : any) => {
    setPassword(event.target.value);
  }; 

  const handlePasswordGenerator = () => {
    const generatedPassword = generatePassword(12);
    const field = document.getElementById('password') as HTMLInputElement;
    field.value = generatedPassword;
    handlePasswordChange({target: {value: generatedPassword}});
  };

    const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
          message: { value: string };
          bruteforceSafe: { checked: boolean };
          password: { value: string };
          endToEndEncryption: { checked: boolean };
        };

        // Set Button disabled and add loading animation and text "Creating Message"
        const submitButton = document.getElementById('submit') as HTMLButtonElement;
        const message = target.message.value;

        if(message === '') {
          alert('Please enter a message!');
        } else {
          submitButton.disabled = true;
          submitButton.innerHTML = '<div class="flex items-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span class="text-white">Creating</span></div>';
          const bruteforceSafe = target.bruteforceSafe.checked;
          const password = target.password.value;
          const endToEndEncryption = target.endToEndEncryption.checked;

          const tmpEncryptMsg = await encryptTransfer(message);
          let tmpEncryptPwd = '';
          if(password !== '') {
            tmpEncryptPwd = await encryptTransfer(password);
          }

          const data = {
            tmpEncryptMsg,
            bruteforceSafe,
            tmpEncryptPwd,
            endToEndEncryption
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
                submitButton.disabled = false;
                submitButton.innerHTML = '<div class="flex items-center"><svg class="animate-error-cross mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18L18 6M6 6l12 12"></path></svg><span class="text-white">Error</span></div>';
            } else {
                setMessageCreated(true);
                setMessageLink(result.link);
            }
        }
    };

  return (
    <>
    <Header />
    <div className="flex items-center justify-center py-8 px-2 md:min-h-screen">
      <div className="bg-slate-800 p-5 rounded-lg shadow-md w-full max-w-md md:mb-96 mb-40">
        {!messageCreated ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-100">
                New Message
              </h1>
              <div className="flex items-center">
                <button
                  className={`text-white font-bold px-3 py-1 rounded-full hidden md:block transform transition duration-200 hover:scale-105 ml-auto ${
                            securityIndicator === "Not Secure"
                              ? "bg-red-500 hover:bg-red-600"
                              : securityIndicator === "Okay"
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-green-500 hover:bg-green-600"
                            }`
                          }
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                >                
                {securityIndicator}
                {showTooltip && 
                  <div className="absolute w-64 top-full left-1/2 transform -translate-x-1/4 md:-translate-x-1/2 bg-black text-white p-2 text-md rounded-md shadow-lg mt-2">
                    The Security Indicator provides real-time updates on your chosen security settings.
                  </div>
                }
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-3 py-1 rounded-full transform transition duration-200 hover:scale-110 ml-3"
                onClick={() => setShowHelp(prevState => !prevState)}
              >
                <FontAwesomeIcon icon={faQuestionCircle} />
              </button>
              </div>
            </div>
            {showHelp && (
              <div className="mb-4">
                <p className="text-slate-300">
                  Here you can create a new message. You can choose from various options to customize the security of your message.
                </p>
              </div>
              )}
            <form onSubmit={handleSubmit}>
              <div id="pad">
                <textarea
                  className="bg-slate-950 text-white textarea w-full p-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:shadow-md focus:shadow-blue-700 transition duration-200"
                  name="message"
                  id="message"
                  placeholder="Write down your private message..."
                  rows={6}
                  minLength={1}
                ></textarea>
              </div>
              <div className="flex justify-between flex-wrap items-start mt-4">
                <div className="flex flex-col">
                  <div className="relative flex items-center mb-2">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      className="bg-slate-950 text-white rounded-lg block p-3 pe-16 w-60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:shadow-md focus:shadow-blue-700 transition duration-200"
                      placeholder="Optional Password"
                      minLength={1}
                      onChange={handlePasswordChange}
                    />
                    {password.length > 0 && (
                      <div className="h-6 w-6 text-slate-300 absolute right-8 cursor-pointer hover:text-blue-500">
                        <FontAwesomeIcon id="pwd-icon" icon={passwordVisible ? faEye : faEyeSlash}
                        onClick={handlePasswordVisibility}
                        />
                      </div>
                    )}
                    <div className="h-6 w-6 text-slate-300 absolute right-2 cursor-pointer hover:text-blue-500">
                      <FontAwesomeIcon icon={faRefresh} 
                      onClick={handlePasswordGenerator}
                      />
                    </div>
                  </div>
                  {showHelp && (
                  <div className="mb-4">
                    <p className="text-slate-300 w-56 text-sm">
                      You can optionally set a password for your message.
                    </p>
                  </div>
                  )}
                </div>
                <button
                  type="submit"
                  id="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded transition duration-200 shadow-md md:ml-2"
                >
                  Create
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
              {showHelp && (
                <div className="mb-4">
                  <p className="text-slate-300 text-sm">
                    This option allows you to create a message link that is 90 characters long. This makes it impossible to guess the link and brute force it.
                  </p>
                </div>
              )}
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="endToEndEncryption"
                  onChange={handleEndToEndToggle}
                  className="mr-2 w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
                <label htmlFor="endToEndEncryption" className="text-white">
                  End-to-End Encryption
                </label>
              </div>
              {showHelp && (
                <div className="mb-4">
                  <p className="text-slate-300 text-sm">
                    This option enables end-to-end encryption, which means we don't store the secret key which is used to encrypt your message. This means that we cannot decrypt your message and therefore cannot read it.
                  </p>
                </div>
              )}
              <div className="mt-4">
                <span className="text-slate-300">Example Link:</span>
                <br />
                <span className="text-slate-400">{process.env.NEXT_PUBLIC_MAIN_DOMAIN}/msg/</span>
                <a
                  rel="noopener noreferrer"
                  className="text-blue-600 break-all"
                >
                  {exampleLink}
                </a>
              </div>
              {showHelp && (
                <div className="mb-4">
                  <p className="text-slate-300 text-sm">
                    With this example link you can see how your message link will look like. (This is not a real link)
                  </p>
                </div>
              )}
              <Link href="how-message" className="text-center text-blue-500 text-sm block mt-4">
                <FontAwesomeIcon icon={faLink} /> Learn More
              </Link>
            </form>
          </>
        ) : (
            <>
              <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-100">
                Message Created!
              </h1>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-3 py-1 rounded-full transform transition duration-200 hover:scale-110"
                onClick={() => setShowHelp(prevState => !prevState)}
              >
                <FontAwesomeIcon icon={faQuestionCircle} />
              </button>
            </div>
            {showHelp && (
              <div className="mb-4">
                <p className="text-slate-300">
                  Your message has been created! You can now copy the link and send it to your friends.<br/><br/> (The link will be deleted after the message has been viewed, so you can't send it to multiple people!)
                </p>
              </div>
              )}
              <div className="mb-4">
                <input
                  type="text"
                  value={`${messageLink}`}
                  readOnly
                  className="bg-slate-950 text-white w-full p-2 rounded-lg blur-[3px] hover:blur-none transition duration-300 focus:outline-none"
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
    <Footer />
    </>
  );
}

export default CreateMessage;