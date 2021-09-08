import React, { useEffect } from 'react';
import {
  Switch, Route, Redirect, useHistory,
} from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
// eslint-disable-next-line camelcase
import { unstable_createMuiStrictModeTheme } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useUserDispatch, useUserState } from './utils/hooks/useUserContext';
import { useAppDispatch, useAppState } from './utils/hooks/useAppContext';
import LoginPage from './components/pages/LoginPage/LoginPage';
import { asyncGetRequest, makeAPIPath } from './utils/utils';
import RegisterPage from './components/pages/RegisterPage/RegisterPage';
import MainTemplate from './components/templates/MainTemplate/MainTemplate';
import MFARegisterPage from './components/pages/MFARegisterPage/MFARegisterPage';
import MFAPage from './components/pages/MFAPage/MFAPage';
import CommunityPage from './components/pages/CommunityPage/CommunityPage';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import {
  ChannelType, DMRoomType, MessageType, RawChannelType,
} from './types/Chat';
import ChannelPage from './components/pages/ChannelPage/ChannelPage';
import makeChannelInfo from './utils/channels';

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
  const theme = unstable_createMuiStrictModeTheme();
  const appState = useAppState();
  const appDispatch = useAppDispatch();
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const classes = useStyles();
  const history = useHistory();
  let channels: ChannelType[] = [];
  let dms: DMRoomType[] = [];

  useEffect(() => {
    if (userState.id) {
      const socket = io(String(process.env.REACT_APP_API_URL)!);
      socket.on('connect', () => {
        appDispatch({ type: 'connect', socket });
        socket.emit('join', { id: userState.id });
        appDispatch({ type: 'join', channels, dms });
        appDispatch({ type: 'endLoading' });

        socket.on('message', (message: MessageType) => {
          if (message.channel.name === appState.chatting) {
          // TODO: 채팅 Page로 메시지 내려주기
          } else appDispatch({ type: 'newMessage', message });
        });
      });
    }
  }, [userState.id]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    appDispatch({ type: 'loading' });
    /**
     * NOTE 서버가 실패 응답(예: 403)을 주면 콘솔에 오류가 뜹니다.
     * 서버에서 콘솔에 적도록 하는 것이라 프론트에서 핸들링이 불가한데,
     * 이 부분은 서브젝트 요구사항과 안 맞는 듯해서 추후 고민해봐야 할 것 같습니다.
    */
    asyncGetRequest(makeAPIPath('/users/me'))
      .finally(() => {
        appDispatch({ type: 'endLoading' });
      })
      .then(({ data }) => {
        const {
          id, name, avatar, enable2FA, authenticatorSecret, isSecondFactorAuthenticated,
        } = data;
        userDispatch({
          type: 'login',
          info: {
            id,
            name,
            avatar: makeAPIPath(`/${avatar}`),
            enable2FA,
            authenticatorSecret,
            isSecondFactorAuthenticated,
          },
        });
        if (enable2FA && !authenticatorSecret) history.push('/register/2fa');
        else if (enable2FA && !isSecondFactorAuthenticated) history.push('/2fa');
        appDispatch({ type: 'loading' });
        return (asyncGetRequest(makeAPIPath('/channels/me')));
      })
      .then(({ data }) => {
        channels = data.map((channel: RawChannelType) => makeChannelInfo(channel));
        return (asyncGetRequest(makeAPIPath('/dmers')));
      })
      .then(({ data }) => {
        dms = data.map((dm: any) => ({
          id: dm.id,
          name: dm.name,
          unreads: 0,
        }));
      })
      .catch((error) => {
        if (error.response) {
          userDispatch({ type: 'reset' });
        } else {
          toast.error(error.message);
        }
      });

    return () => { if (appState.socket) appState.socket.disconnect(); };
  }, []);

  const children = userState.id ? (
    <Switch>
      <Route exact path="/register/2fa" component={MFARegisterPage} />
      <Route exact path="/2fa" component={MFAPage} />
      <Route path="/">
        <MainTemplate
          main={(
            <Switch>
              <Route exact path="/">
                <Redirect to="/game" />
              </Route>
              <Route path="/community" component={CommunityPage} />
              <Route path="/channel" component={ChannelPage} />
              <Route path="/profile/:username" component={ProfilePage} />
              <Route exact path="/profile">
                <Redirect to={`/profile/${userState.name}`} />
              </Route>
              <Route exact path="/404" render={() => <h1>404 Not found</h1>} />
              <Route path="/">
                <Redirect to="/404" />
              </Route>
            </Switch>
      )}
          chat={<h3>chat</h3>}
        />
      </Route>
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/register" component={RegisterPage} />
      <Route path="/" component={LoginPage} />
    </Switch>
  );

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default App;
