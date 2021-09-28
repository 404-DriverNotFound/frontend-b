import React, { useEffect, useState } from 'react';
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
import { GameModeType } from '../../../types/Match';
import Typo from '../../atoms/Typo/Typo';

const MAIN_GAME_PAGE = '/game';
const CLASSIC_PLAY_PATH = '/game/playclassic';
const SPEED_PLAY_PATH = '/game/playspeed';
const REVERSE_PLAY_PATH = '/game/playreverse';
const WATCH_PLAY_PATH = '/game/watch';

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
  const { socket } = useAppState();
  const [mode, setMode] = useState<GameModeType | null>(null);
  const {
    isOpen, setOpen, dialog, setDialog,
  } = useDialog();

  const handleReady = (position: 'LEFT' | 'RIGHT', setting: any) => {
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log(position, setting);
      socket?.off('ready');
      setOpen(false);
    }, 3000);
  };

  useEffect(() => {
    if (!mode) {
      socket?.off('ready');
      setOpen(false);
    } else if (mode === 'CLASSIC') {
      setDialog({ ...dialog, title: 'Classic Game Matching...' });
      socket?.on('ready', handleReady);
      setOpen(true);
      socket?.emit('waiting');
    } // FIXME: 다른 모드도 추가하고 공통부분 밖으로 빼기
    // TODO emit할 때 roomId 같이 보내달라고 요청하기
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
      buttons: <Button onClick={() => setMode(null)}>매칭 취소</Button>,
      onClose: () => setMode(null),
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
        <GameOptionCard option="CLASSIC" onClick={() => setMode('CLASSIC')} />
      </Grid>
      <Grid item xs={6}>
        <GameOptionCard option="SPEED" onClick={() => setMode('SPEED')} />
      </Grid>
      <Grid item xs={6}>
        <GameOptionCard option="REVERSE" onClick={() => setMode('REVERSE')} />
      </Grid>
      <Grid item xs={6}>
        <GameOptionCard option="WATCH" onClick={() => { history.push(WATCH_PLAY_PATH); }} />
      </Grid>
    </Grid>
  );
};

const GamePage = () => {
  const { socket } = useAppState();
  return (
    <>
      {/* FIXME: button들 삭제해야 함 */}
      <Button onClick={() => {
        // eslint-disable-next-line no-console
        if (socket?.emit('waiting')) console.log('emit waiting');
      }}
      >
        waiting
      </Button>
      <Button onClick={() => {
        // eslint-disable-next-line no-console
        if (socket?.emit('ready')) console.log('emit ready');
      }}
      >
        ready
      </Button>
      <Button onClick={() => {
        // eslint-disable-next-line no-console
        if (socket?.emit('leaveGame')) console.log('emit leave game');
      }}
      >
        leaveGame
      </Button>
      <Switch>
        <Route exact path={MAIN_GAME_PAGE} component={GameMainPage} />
        <Route exact path={CLASSIC_PLAY_PATH} render={() => <h1>Classic play</h1>} />
        <Route exact path={SPEED_PLAY_PATH} render={() => <h1>Speedy play</h1>} />
        <Route exact path={REVERSE_PLAY_PATH} render={() => <h1>Reverse play</h1>} />
        <Route path={WATCH_PLAY_PATH} component={GameWatchPage} />
        <Route exact path="/">
          <Redirect to={MAIN_GAME_PAGE} />
        </Route>
      </Switch>
    </>
  );
};

export default GamePage;
