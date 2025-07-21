import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createShortenedUrl } from '../services/api';
import '../styles/ShortenerForm.css';

const ShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [oneTimeUrl, setOneTimeUrl] = useState(false);
  const [timedUrl, setTimedUrl] = useState(false);
  const [expirationTime, setExpirationTime] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setShortenedUrl(null);
    setLoading(true);

    const urlData = {
      original_url: originalUrl,
      one_time_url: oneTimeUrl,
      timed_url: timedUrl,
      expiration_time: timedUrl ? expirationTime : null,
    };

    try {
      const data = await createShortenedUrl(urlData);
      setShortenedUrl(data.short_code);
    } catch (err) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        const errorMessages = Object.keys(errorData)
          .map((key) => `${key}: ${errorData[key]}`)
          .join(' ');
        setError(errorMessages);
      } else {
        setError('Failed to shorten URL. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="shortener-form"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="originalUrl">Original URL</label>
          <input
            type="text"
            id="originalUrl"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter the URL to shorten"
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={oneTimeUrl}
              onChange={(e) => setOneTimeUrl(e.target.checked)}
            />
            One-time URL
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={timedUrl}
              onChange={(e) => setTimedUrl(e.target.checked)}
            />
            Timed URL
          </label>
        </div>
        {timedUrl && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="form-group"
          >
            <label htmlFor="expirationTime">Expiration Time</label>
            <input
              type="datetime-local"
              id="expirationTime"
              value={expirationTime}
              onChange={(e) => setExpirationTime(e.target.value)}
              required
            />
          </motion.div>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
        >
          {loading ? 'Shortening...' : 'Shorten'}
        </motion.button>
      </form>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="error-message"
        >
          {error}
        </motion.div>
      )}
      {shortenedUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="success-message"
        >
          Shortened URL: <a href={`/shortener/${shortenedUrl}`}>{`/shortener/${shortenedUrl}`}</a>
          <button
            onClick={() => navigator.clipboard.writeText(`${window.location.origin}/shortener/${shortenedUrl}`)}
            className="copy-button"
          >
            Copy
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ShortenerForm;
