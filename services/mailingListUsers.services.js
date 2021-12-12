import fetch from 'isomorphic-unfetch';

export const postNewMailingListUser = async (body) => {
  try {
    const response = await fetch(
      'http://localhost:3000/api/mailingListUsers/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    ).then((r) => r.json());

    const { success = false, newUser = null, error = '' } = response;

    return { success, newUser, error };
  } catch (error) {
    throw error;
  }
};
