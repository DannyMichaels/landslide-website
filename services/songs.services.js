import fetch from 'isomorphic-unfetch';

export const getAllSongs = async () => {
  const response = await fetch('http://localhost:3000/api/songs/', {
    method: 'GET',
  })
    .then((r) => r.json())
    .then((data) => data);

  const allSongs = response.data;

  return allSongs;
};
