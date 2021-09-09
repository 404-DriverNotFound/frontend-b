import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { makeAPIPath } from '../utils';
import { useAppDispatch, useAppState } from './useAppContext';
import { useUserDispatch } from './useUserContext';

const useLogout = () => {
  const history = useHistory();
  const appDispatch = useAppDispatch();
  const appState = useAppState();
  const userDispatch = useUserDispatch();

  const handleLogout = () => {
    appDispatch({ type: 'loading' });
    axios.get(makeAPIPath('/auth/logout'))
      .finally(() => {
        appDispatch({ type: 'endLoading' });
      })
      .then(() => {
        if (appState.socket) appState.socket.disconnect();
        appDispatch({ type: 'disconnect' });
        userDispatch({ type: 'logout' });
        history.push('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return handleLogout;
};

export default useLogout;