import axios from 'axios';

const API_KEY = 'c347c2645b266dedc1e85208ea89cca6';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
