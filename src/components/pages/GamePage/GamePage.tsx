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
import GamePlayPage from '../GamePlayPage/GamePlayPage';

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

type MainPageProps = {
  mode: GameModeType | null,
  // eslint-disable-next-line no-unused-vars
  setMode: (mode: GameModeType | null) => void,
  // eslint-disable-next-line no-unused-vars
  setSetting: (setting: any) => void,
  // eslint-disable-next-line no-unused-vars
  setPosition: (position: 'LEFT' | 'RIGHT' | null) => void,
};

const GameMainPage = ({
  mode, setMode, setSetting, setPosition,
}: MainPageProps) => {
  const history = useHistory();
  const classes = useStyles();
  const { socket } = useAppState();
  const {
    isOpen, setOpen, dialog, setDialog,
  } = useDialog(); // TODO: 이 모든 것들 GameContext로 따로 빼기

  const handleReady = (position: 'LEFT' | 'RIGHT', setting: any) => {
    // eslint-disable-next-line no-console
    console.log(position, setting);
    setPosition(position);
    setSetting(setting);
    socket?.off('ready');
    setOpen(false);
    history.push(PLAY_PATH);
  };

  useEffect(() => {
    if (!mode) {
      socket?.off('ready');
      setOpen(false);
      return;
    }
    setDialog({ ...dialog, title: `${mode} MODE matching...` });
    socket?.on('ready', handleReady);
    setOpen(true);
    socket?.emit('waiting');
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
        <GameOptionCard option="WATCH" onClick={() => { history.push(WATCH_PATH); }} />
      </Grid>
    </Grid>
  );
};

const GamePage = () => {
  const { socket } = useAppState();
  const [mode, setMode] = useState<GameModeType | null>(null);
  const [setting, setSetting] = useState(null);
  const [position, setPosition] = useState<'LEFT' | 'RIGHT' | null>(null);
  return (
    <>
      {/* FIXME: button들 삭제해야 함 */}
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
        <Route
          exact
          path={MAIN_GAME_PAGE}
          render={() => (
            <GameMainPage
              mode={mode}
              setMode={setMode}
              setSetting={setSetting}
              setPosition={setPosition}
            />
          )}
        />
        <Route
          exact
          path={PLAY_PATH}
          render={() => <GamePlayPage setting={setting} mode={mode} position={position} />}
        />
        <Route path={WATCH_PATH} component={GameWatchPage} />
        <Route exact path="/">
          <Redirect to={MAIN_GAME_PAGE} />
        </Route>
      </Switch>
    </>
  );
};

export default GamePage;
