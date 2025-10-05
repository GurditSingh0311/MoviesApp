import axios from 'axios';

const API_KEY = 'c347c2645b266dedc1e85208ea89cca6'; // your v3 key
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchData = async (endpoint) => {
  try {
    // endpoint should start with '/' e.g. '/movie/popular' or '/search/movie?query=batman'
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  } catch (err) {
    console.error('API error:', err.message || err);
    return null;
  }
};
