import axios from 'axios';

const asyncGetRequest = async (url: string) => {
  const response = await axios.get(url);
  return response;
};

// eslint-disable-next-line import/prefer-default-export
export { asyncGetRequest };
