import fetch from 'isomorphic-unfetch';

let header = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
});

export const postNewMailingListUser = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
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
