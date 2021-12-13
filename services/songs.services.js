import fetch from 'isomorphic-unfetch';

export const getAllSongs = async () => {
  const baseURL = process.env.API_URL || 'http://localhost:3000/api';

  const response = await fetch(`${baseURL}/songs/`, {
    method: 'GET',
  }).then((r) => r.json());

  const allSongs = response.data;

  return allSongs;
};
