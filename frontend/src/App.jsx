// src/App.jsx

import { useState } from 'react';
import axios from 'axios';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShorten = async () => {
    if (!originalUrl) return;

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/shorten', {
        originalUrl,
      });

      console.log(response.data);

      setShortUrl(`${response.data.shortUrl}`);
    } catch (err) {
      console.error(err);
      setError('Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">InfinityLink - URL Shortener</h1>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Enter your original URL"
          className="w-full p-3 border rounded mb-4"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />

        <button
          onClick={handleShorten}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {shortUrl && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
            Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="underline">{shortUrl}</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
