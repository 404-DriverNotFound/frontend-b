import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDispatch, useUserState } from './utils/hooks/useContext';
import LoginPage from './components/pages/LoginPage/LoginPage';
import makeAPIPath from './utils/utils';

const App = () => {
  /**
   * FIXME: 아직 API 연동이 안 되어있어서 임시로 progress bar 넣어 둠
   * 해결되면 지우거나 좀 더 괜찮은 모양새로 고칠 것
   */
  const [isLoading, setLoading] = useState<boolean>(false);
  const state = useUserState();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    /**
     * FIXME: CORS 때문인지 서버가 안 떠있어서 그런 건지 콘솔에 오류가 뜸
     * 문제 원인 파악해서 해결하고 FIXME 지워줄 것
    */
    axios.get(makeAPIPath('/users/me'))
      .finally(() => { setLoading(false); })
      .then((response) => {
        const { id, name, avatar } = response.data;
        dispatch({
          type: 'login',
          info: { id, name, avatar },
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({ type: 'reset' });
        } else {
          toast.error(error.message);
        }
      });
  }, []);

  const children = state.id ? (
    // FIXME: Main Page 컴포넌트가 없어 임시로 적어 둠
    <Switch>
      <Route exact path="/" render={() => <h1>main page</h1>} />
    </Switch>
  ) : (
    <Route path="/" component={LoginPage} />
  );

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isLoading ? <LinearProgress /> : children}
    </>
  );
};

export default App;
