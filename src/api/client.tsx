const BASE_URL = process.env.REACT_APP_BASE_URL as string;

/**
 * Good fetch documentation:
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful
 */
export const client = async (endpoint: string) => {
  const response = await fetch(BASE_URL + endpoint).then(async (response) => {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  });

  return response;
};

export default client;
