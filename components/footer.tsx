import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="text-white mb-8 md:mb-0">
            <h2 className="text-3xl font-bold">Solun</h2>
            <p className="mt-4">
              E-Mail: contact@solun.pm
            </p>
          </div>
          <div className="flex flex-col md:flex-row text-white md:gap-10">
            <div className="mb-8 md:mb-0 md:ml-auto">
              <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
              <ul>
                <li><Link href="https://github.com/solun-pm" target='_blank' className="hover:text-blue-300 transition duration-200">GitHub</Link></li>
                <li><Link href="/#services" className="hover:text-blue-300 transition duration-200">Services</Link></li>
                <li><Link href="https://discord.gg/UHWcTMawrv" target='_blank' className="hover:text-blue-300 transition duration-200">Our Discord</Link></li>
              </ul>
            </div>
            <div>
            <div className="mb-8 md:mb-0 md:ml-auto">
              <h3 className="text-2xl font-bold mb-4">Articles</h3>
              <ul>
                <li><Link href="/how-message" className="hover:text-blue-300 transition duration-200">Messaging</Link></li>
                <li><Link href="/how-file" className="hover:text-blue-300 transition duration-200">File Sharing</Link></li>
                <li><Link href="/features" className="hover:text-blue-300 transition duration-200">New Features</Link></li>
              </ul>
            </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Rights</h3>
              <ul>
                <li><Link href="/tos" className="hover:text-blue-300 transition duration-200">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-blue-300 transition duration-200">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;