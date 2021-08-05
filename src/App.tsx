import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  useAppDispatch, useAppState, useUserDispatch, useUserState,
} from './utils/hooks/useContext';
import LoginPage from './components/pages/LoginPage/LoginPage';
import makeAPIPath from './utils/utils';
import RegisterPage from './components/pages/RegisterPage/RegisterPage';
import MainTemplate from './components/templates/MainTemplate/MainTemplate';

const useStyles = makeStyles({
  progress: {
    position: 'fixed',
    top: 'calc(40vh)',
    left: 'calc(50vw - 50px)',
    width: '100%',
  },
  block: {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: 1200,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

const App = () => {
  const history = useHistory();
  const appState = useAppState();
  const appDispatch = useAppDispatch();
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const classes = useStyles();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    appDispatch({ type: 'loading' });
    /**
     * FIXME: 서버가 403 주면 콘솔에 오류 뜸
     * 서버에서 콘솔에 적는 거라 프론트에서 핸들링 불가
     * 그러면 성공 응답을 받아야 하나?
    */
    axios.get(makeAPIPath('/session'))
      .finally(() => {
        appDispatch({ type: 'endLoading' });
      })
      .then(() => {
        axios.get(makeAPIPath('/users/me'))
          .then((response) => {
            const { id, name, avatar } = response.data;
            userDispatch({
              type: 'login',
              info: { id, name, avatar },
            });
          })
          .catch((error) => {
            if (error.response) {
              history.push('/register');
            } else {
              toast.error(error.message);
            }
          });
      })
      .catch((error) => {
        if (error.response) {
          userDispatch({ type: 'reset' });
        } else {
          toast.error(error.message);
        }
      });
  }, []);

  const children = userState.id ? (
    // FIXME: Main Page 컴포넌트가 없어 임시로 적어 둠
    // register page에서 세션 있는지, id 검증까지 하도록 해야 하나?
    <Switch>
      <Route exact path="/" render={() => <MainTemplate main={<h1>asd</h1>} chat={<h1>asd</h1>} />} />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/register" component={RegisterPage} />
      <Route path="/" component={LoginPage} />
    </Switch>
  );

  return (
    <>
      {appState.isLoading
        && (
        <div className={classes.block}>
          <CircularProgress
            size={100}
            className={classes.progress}
            aria-busy={appState.isLoading}
          />
        </div>
        )}
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
      {children}
    </>
  );
};

export default App;
