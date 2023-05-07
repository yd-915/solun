import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faShieldAlt, faUserSecret, faKey } from '@fortawesome/free-solid-svg-icons';

const WhySolun = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-600 h-14">Why Solun?</h2>
          <div className="flex items-start bg-gradient-to-br from-blue-400 to-blue-500 p-4 rounded shadow-lg text-white">
            <FontAwesomeIcon icon={faLock} className="text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-bold mb-2">End-to-End Encryption</h3>
              <p>All data is encrypted end-to-end, ensuring that only the intended recipient can access it.</p>
            </div>
          </div>
          <div className="flex items-start bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded shadow-lg text-white">
            <FontAwesomeIcon icon={faKey} className="text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-bold mb-2">Zero-Knowledge Architecture</h3>
              <p>Our zero-knowledge architecture ensures that even we cannot access your data, offering you the ultimate privacy.</p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex items-start bg-gradient-to-br from-blue-700 to-blue-800 p-4 rounded shadow-lg text-white">
            <FontAwesomeIcon icon={faShieldAlt} className="text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-bold mb-2">High Security Standards</h3>
              <p>Our platform maintains strict security standards to protect your data and privacy.</p>
            </div>
          </div>
          <div className="flex items-start bg-gradient-to-br from-blue-800 to-blue-900 p-4 rounded shadow-lg text-white">
            <FontAwesomeIcon icon={faUserSecret} className="text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-bold mb-2">Complete Anonymity</h3>
              <p>We don't store any user-related data on our servers, ensuring your complete anonymity.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhySolun;
