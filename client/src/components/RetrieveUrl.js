import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/RetrieveUrl.css';

const RetrieveUrl = () => {
  const [shortCode, setShortCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (shortCode) {
      window.location.href = `/shortener/${shortCode}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="retrieve-url"
    >
      <h2>Retrieve URL</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            placeholder="Enter short code"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
        >
          Retrieve
        </motion.button>
      </form>
    </motion.div>
  );
};

export default RetrieveUrl;
