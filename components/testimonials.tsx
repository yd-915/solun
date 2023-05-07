"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

const testimonialsData = [
    {
      name: 'Alice',
      text: "I absolutely love the privacy and security features offered by Solun! It's been my go-to service for sharing files securely, and I can't recommend it enough. The team behind the service has done an amazing job in prioritizing privacy and creating a user-friendly experience. Thank you!",
    },
    {
      name: 'Bob',
      text: "I have been using Solun for secure file sharing, and I must say it has been a reliable companion. It offers a seamless and efficient way to protect my data while ensuring that only the intended recipients can access it. Great service!",
    },
    {
      name: 'Charlie',
      text: "Privacy is a top priority for me, and that's why I appreciate the level of privacy and security provided by Solun. The zero-knowledge architecture gives me peace of mind, knowing that my data remains inaccessible to anyone, including the service itself. Thank you for putting privacy first!",
    },
    {
      name: 'David',
      text: "The encrypted messaging feature offered by Solun has been a game-changer for me. It's so easy to have private conversations with friends and colleagues, knowing that the messages will be automatically deleted. I'm impressed!",
    },
    {
      name: 'Eve',
      text: "When it comes to sharing sensitive files securely, Solun has become an essential tool for me. The ability to set the online duration adds an extra layer of control and ensures that my files remain protected. Well done!",
    },
    {
      name: 'Frank',
      text: "I value my privacy, and that's why I find Solun to be a fantastic service. The end-to-end encryption guarantees that only the intended recipients can access my files. It's reassuring to know that my data is in safe hands!",
    },
    {
      name: 'Grace',
      text: "I've had a wonderful experience using the secure messaging feature provided by Solun. It's incredibly convenient for sending encrypted messages, and the added feature of automatic deletion adds an extra layer of security. Highly recommended!",
    },
    {
      name: 'Henry',
      text: "Sharing files securely has become so much easier for me thanks to Solun's encrypted upload feature. I can confidently send sensitive documents, knowing that they will be protected and accessible only for the intended recipients. Thank you for this valuable service!",
    },
    {
      name: 'Isabelle',
      text: "I'm thrilled with the private mail service offered by Solun. It provides me with a secure mailbox and allows me to communicate confidentially via encrypted emails. It's a must-have for anyone who values their privacy.",
    },
    {
      name: 'Jack',
      text: "The zero-knowledge architecture of Solun sets it apart from other services. The fact that even the service provider cannot access my data gives me complete confidence in using it for my privacy needs.",
    }
  ];
  

  const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const previousTestimonial = () => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === 0) {
          return testimonialsData.length - 3;
        } else {
          return prevIndex - 1;
        }
      });
    };
  
    const nextTestimonial = () => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex + 3 >= testimonialsData.length) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h2 className="text-center md:h-14 text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-600">
        That's why people benefit from Solun
      </h2>
      <p className="text-center mb-6 text-gray-600">Based on survey results</p>
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-8 md:mx-20">
          {testimonialsData
            .slice(
              currentIndex,
              currentIndex + (window.innerWidth >= 640 ? (window.innerWidth >= 768 ? 3 : 2) : 1)
            )
            .map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-400 to-blue-500 p-4 rounded shadow-lg text-white"
              >
                <div className="flex items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{testimonial.name}</h3>
                    <FontAwesomeIcon
                      icon={faQuoteLeft}
                      className="text-2xl text-blue-100"
                    />
                  </div>
                </div>
                <p className="italic">{testimonial.text}</p>
              </div>
            ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-400 text-white font-semibold px-6 py-3 rounded mr-4 hover:bg-blue-500 transition duration-200"
            onClick={previousTestimonial}
          >
            &lt; Previous
          </button>
          <button
            className="bg-blue-400 text-white font-semibold px-6 py-3 rounded hover:bg-blue-500 transition duration-200"
            onClick={nextTestimonial}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );  
};

export default Testimonials;