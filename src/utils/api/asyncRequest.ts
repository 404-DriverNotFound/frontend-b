import axios from 'axios';
import { UserStatusType } from '../../types/User';
import makeAPIPath from '../utils';

const changeStatus = async (status: UserStatusType) => {
  const response = await axios.patch(makeAPIPath('/users/me'), {
    status,
  });
  return response;
};

const asyncGetRequest = async (url: string) => {
  const response = await axios.get(url);
  return response;
};

export { changeStatus, asyncGetRequest };
