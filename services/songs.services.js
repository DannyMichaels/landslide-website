import fetch from 'isomorphic-unfetch';

const baseURL = process.env.API_URL || 'http://localhost:3000/api';
export const getAllSongs = async (url = baseURL) => {
  const response = await fetch(url, {
    method: 'GET',
  }).then((r) => r.json());

  const allSongs = response.data;

  return allSongs;
};
