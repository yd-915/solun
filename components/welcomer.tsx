import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Welcomer = () => {
  return (
    <div className="bg-gray-950">
        <div className="container mx-auto px-4 py-8 md:py-16 h-full flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full">
            <div className="text-white text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-5xl md:h-14 font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-600">Privacy at its highest</h1>
            <p className="mb-8 leading-relaxed md:max-w-[40rem]">
                Solun is a service that allows you to share files, text, and send emails with end-to-end encryption, without storing any user-related data on our servers. Become anonymous and protect your privacy today.
            </p>
            <div className="flex justify-center md:justify-start">
                <button className="bg-blue-400 text-white font-semibold px-6 py-3 rounded mr-4 hover:bg-blue-500 transition duration-200">Get Started</button>
                <button className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded hover:bg-blue-400 hover:border-blue-400 transition duration-200">Learn More</button>
            </div>
            </div>

            <div>

            </div>
        </div>
        </div>
    </div>
  )
}

export default Welcomer;
