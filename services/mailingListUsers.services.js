import fetch from 'isomorphic-unfetch';

let header = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'multipart/form-data',
});

export const postNewMailingListUser = async (body) => {
  const baseURL = process.env.API_URL || 'http://localhost:3000/api';

  try {
    const response = await fetch(`${baseURL}/mailingListUsers/`, {
      method: 'POST',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': '*',
      //   Origin: baseURL,
      //   'access-control-allow-methods': 'GET',
      // },
      // header: {

      // },
      header,
      body: JSON.stringify(body),
    }).then((r) => r.json());

    const { success = false, newUser = null, error = '' } = response;

    if (error !== '') {
      throw new Error(error.toString());
    }

    return { success, newUser, error };
  } catch (error) {
    throw error;
  }
};
