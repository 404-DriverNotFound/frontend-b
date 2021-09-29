import React, { useEffect } from 'react';
import {
  Route, Switch, useHistory, Redirect,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import GameOptionCard from '../../molecules/GameOptionCard/GameOptionCard';
import GameWatchPage from '../GameWatchPage/GameWatchPage';
import { useAppState } from '../../../utils/hooks/useAppContext';
import useDialog from '../../../utils/hooks/useDialog';
import Button from '../../atoms/Button/Button';
import Dialog from '../../molecules/Dialog/Dialog';
import Typo from '../../atoms/Typo/Typo';
import GamePlayPage from '../GamePlayPage/GamePlayPage';
import { GameContextProvider, useGameDispatch, useGameState } from '../../../utils/hooks/useGameContext';
import { RawUserInfoType } from '../../../types/Response';

const MAIN_GAME_PAGE = '/game';
const PLAY_PATH = '/game/play';
const WATCH_PATH = '/game/watch';

const useStyles = makeStyles({
  root: {
    height: '78vh',
    margin: '0.5em auto',
    backgroundColor: '#eee',
    borderRadius: '10px',
    padding: '5px',
  },
  progress: {
    margin: '1em',
  },
});

const GameMainPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const { mode } = useGameState();
  const gameDispatch = useGameDispatch();
  const { socket } = useAppState();
  const {
    isOpen, setOpen, dialog, setDialog,
  } = useDialog();

  const handleReady = (position: 'LEFT' | 'RIGHT', player0: RawUserInfoType, player1: RawUserInfoType, setting: any) => {
    // eslint-disable-next-line no-console
    console.log(player0, player1);
    gameDispatch({ type: 'ready', setting, position });
    socket?.off('ready');
    setOpen(false);
    history.push(PLAY_PATH);
  };

  const handleExit = () => {
    socket?.emit('leaveGame');
    gameDispatch({ type: 'setMode', mode: null });
  };

  useEffect(() => {
    if (!mode) {
      socket?.off('ready');
      setOpen(false);
    } else {
      setDialog({ ...dialog, title: `${mode} MODE matching...` });
      socket?.on('ready', handleReady);
      setOpen(true);
      socket?.emit('waiting');
    }
  }, [mode]);

  useEffect(() => {
    setDialog({
      title: 'default',
      content: (
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <CircularProgress size={100} className={classes.progress} aria-busy />
          <Typo variant="subtitle1" align="center">매칭 가능한 유저를 찾는 중입니다</Typo>
        </Grid>
      ),
      buttons: <Button onClick={handleExit}>매칭 취소</Button>,
      onClose: handleExit,
    });
  }, []);

  return (
    <Grid className={classes.root} container justifyContent="space-evenly" alignItems="center" spacing={3}>
      <Dialog
        title={dialog.title}
        content={dialog.content}
        buttons={dialog.buttons}
        isOpen={isOpen}
        onClose={dialog.onClose}
      />
      <Grid item xs={6}>
        <GameOptionCard option="CLASSIC" onClick={() => gameDispatch({ type: 'setMode', mode: 'CLASSIC' })} />
      </Grid>
      <Grid item xs={6}>
        <GameOptionCard option="SPEED" onClick={() => gameDispatch({ type: 'setMode', mode: 'SPEED' })} />
      </Grid>
      <Grid item xs={6}>
        <GameOptionCard option="REVERSE" onClick={() => gameDispatch({ type: 'setMode', mode: 'REVERSE' })} />
      </Grid>
      <Grid item xs={6}>
        <GameOptionCard option="WATCH" onClick={() => { history.push(WATCH_PATH); }} />
      </Grid>
    </Grid>
  );
};

const GamePage = () => (
  <GameContextProvider>
    <Switch>
      <Route exact path={MAIN_GAME_PAGE} component={GameMainPage} />
      <Route exact path={PLAY_PATH} component={GamePlayPage} />
      <Route path={WATCH_PATH} component={GameWatchPage} />
      <Route exact path="/">
        <Redirect to={MAIN_GAME_PAGE} />
      </Route>
    </Switch>
  </GameContextProvider>
);

export default GamePage;
