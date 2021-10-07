import axios, { CancelTokenSource } from 'axios';
import { toast } from 'react-toastify';

const makeAPIPath = (path: string): string => (`${process.env.REACT_APP_API_URL}${path}`);

const asyncGetRequest = async (url: string, source?: CancelTokenSource) => {
  let response;
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  if (source) response = await axios.get(url, { cancelToken: source.token });
  else response = await axios.get(url);
  return response;
};

const errorMessageHandler = (error: any) => {
  if (error.response?.data?.message) {
    toast.error(error.response.data.message[0]);
  } else toast.error(error.message);
};

const makeDateString = (date: Date) => `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

const makeMatchHistoryString = (score: number, win: number, lose: number): string => (`${score}점 / ${win}승 ${lose}패`);

export {
  makeAPIPath, asyncGetRequest, errorMessageHandler, makeDateString, makeMatchHistoryString,
};
