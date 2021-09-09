import React, { useEffect, useState } from 'react';
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
  ChannelType, DMRoomType, RawChannelType, RawDMType, RawMessageType,
} from './types/Chat';
import ChannelPage from './components/pages/ChannelPage/ChannelPage';
import { makeChannelInfo } from './utils/channels';
import ChatPage from './components/pages/ChatPage/ChatPage';
import { DMToMessage, messageToMessage } from './utils/chats';

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
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [DMs, setDMs] = useState<DMRoomType[]>([]);

  useEffect(() => {
    if (userState.id) {
      const socket = io(String(process.env.REACT_APP_API_URL)!);
      socket.on('connect', () => {
        appDispatch({ type: 'connect', socket });
        socket.emit('join', { id: userState.id });
        appDispatch({ type: 'join', channels, DMs });
        appDispatch({ type: 'endLoading' });

        socket.on('message', (data: RawMessageType) => {
          const message = messageToMessage(data);
          appDispatch({ type: 'newMessage', message });
        });

        socket.on('dm', (data: RawDMType) => {
          const message = DMToMessage(data, userState.name);
          appDispatch({ type: 'newMessage', message });
        });
      });
    }
  }, [DMs]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    appDispatch({ type: 'loading' });
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
        setChannels(data.map((channel: RawChannelType) => makeChannelInfo(channel)));
        return (asyncGetRequest(makeAPIPath('/dmers')));
      })
      .then(({ data }) => {
        setDMs(data.map((dm: any) => ({
          id: dm.id,
          name: dm.name,
          unreads: 0,
        })));
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
          chat={<ChatPage />}
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
