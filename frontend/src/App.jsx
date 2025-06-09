// src/App.jsx

import { useState } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import { FaRegCopy } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  

const handleShorten = async () => {
  if (!originalUrl) {
    toast.error('Please enter a URL');
    return;
  }

  setLoading(true);
  setShortUrl('');
  try {
    const response = await axios.post('https://il-vzak.onrender.com/shorten', {
      originalUrl,
    });

    setShortUrl(response.data.shortUrl);
    toast.success('URL shortened successfully!');
  } catch (err) {
    console.error(err);

    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error('Failed to shorten URL');
    }
  } finally {
    setLoading(false);
  }
};


  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#313743] relative overflow-hidden p-4">

    {/* Animated background blobs */}
    <div className="absolute top-0 left-0 w-72 h-72 bg-[#CBE957] opacity-20 rounded-full blur-3xl animate-pulse-slow"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#CBE957] opacity-10 rounded-full blur-3xl animate-float"></div>
    <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#CBE957] opacity-10 rounded-full blur-3xl animate-pulse-slow transform -translate-x-1/2 -translate-y-1/2"></div>

    {/* Header */}
    <header className="text-center mb-20 z-10">
      <h1 className="text-6xl font-extrabold text-[#CBE957] drop-shadow-lg">InfinityLink</h1>
      <p className="text-gray-300 text-xl">Make your links short and sweet ✨</p>
    </header>

    {/* URL Shortener Card */}
    <div className="w-full max-w-md bg-[#3B4252] p-8 rounded-2xl shadow-2xl border border-[#CBE957]/30 z-10">
      <input
        type="text"
        placeholder="Enter your original URL"
        className="w-full p-3 mb-5 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-[#CBE957] focus:outline-none transition"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />

      <button
        onClick={handleShorten}
        disabled={loading}
        className={`w-full p-3 rounded-lg text-lg font-bold transition-transform transform hover:scale-105 
          ${loading ? 'bg-gray-400 text-white' : 'bg-[#CBE957] text-[#313743] hover:bg-[#d9fa70]'}`}
      >
        {loading ? 'Shortening...' : 'Shorten URL'}
      </button>

    {shortUrl && (
          <>
        <div className="mt-6 p-4 bg-[#CBE957]/10 text-[#CBE957] rounded-lg text-center break-words relative">
          Short URL:&nbsp;
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="underline font-medium">
            {shortUrl}
          </a>

          <button
            onClick={() => {
              navigator.clipboard.writeText(shortUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#CBE957] hover:text-[#d9fa70] transition text-xl"
            title="Copy URL"
          >
            <FaRegCopy />
          </button>

          {copied && (
            <p className="text-sm text-green-400 mt-2 absolute bottom-0 right-4 transform translate-y-full">
              Copied!
            </p>
          )}
        </div>
         {/* QR Code display */}
      <div className="mt-6 flex justify-center">
        <QRCodeSVG value={shortUrl} size={128} />
      </div>
      </>
      )}
      </div>
    {/* Extra spacing */}
    <div className="h-32"></div>

    <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
  </div>
  );
}

export default App;
