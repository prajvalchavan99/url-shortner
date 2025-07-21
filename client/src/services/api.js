import axios from 'axios';

const API_URL = '/shortener/';

export const createShortenedUrl = async (urlData) => {
  try {
    const response = await axios.post(API_URL, urlData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
