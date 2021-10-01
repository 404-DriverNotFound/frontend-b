import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typo from '../../components/atoms/Typo/Typo';
import Button from '../../components/atoms/Button/Button';
import { useAppState } from './useAppContext';
import { useGameDispatch, useGameState } from './useGameContext';
import { RawUserInfoType } from '../../types/Response';
import { MatchPositionType, GameModeType } from '../../types/Match';
import { makeAPIPath } from '../utils';
import { SetOpenType, SetDialogType } from './useDialog';

const PLAY_PATH = '/game/play';

const useStyles = makeStyles({
  progress: {
    margin: '1em',
  },
});

const useMatch = (setOpen: SetOpenType, setDialog: SetDialogType) => {
  const { socket } = useAppState();
  const { mode } = useGameState();
  const gameDispatch = useGameDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleReady = (
    position: MatchPositionType,
    player0: RawUserInfoType,
    player1: RawUserInfoType,
    gameSetting: any,
  ) => {
    gameDispatch({
      type: 'ready',
      position,
      player0: { ...player0, avatar: makeAPIPath(`/${player0.avatar}`) },
      player1: { ...player1, avatar: makeAPIPath(`/${player1.avatar}`) },
      setting: gameSetting,
    });
    socket?.off('ready');
    socket?.off('duplicated');
    socket?.off('declined');
    setOpen(false);
    history.push(PLAY_PATH);
  };

  const handleExit = () => {
    socket?.emit('leaveGame', { type: 'LADDER', mode });
    gameDispatch({ type: 'reset' });
    socket?.off('ready');
    socket?.off('duplicated');
    setOpen(false);
  };

  const handleDeclined = () => {
    gameDispatch({ type: 'reset' });
    socket?.off('canceled');
    socket?.off('ready');
    socket?.off('declined');
    setOpen(false);
  };

  const handleCancel = (opponentId: string) => {
    socket?.emit('cancelMatchInvitation', { opponentId });
  };

  const handleCanceled = () => {
    handleDeclined();
    // FIXME: toast
  };

  const inviteUser = (gameMode: GameModeType, opponentId: string) => {
    gameDispatch({
      type: 'setGame',
      gameType: 'EXHIBITION',
      mode: gameMode,
      isPlayer: true,
    });
    setDialog({
      title: '매치 초대 수락 대기 중',
      content: (
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <CircularProgress size={100} className={classes.progress} aria-busy />
          <Typo variant="subtitle1" align="center">매치 초대 후 수락 대기중입니다.</Typo>
        </Grid>
      ),
      buttons: <Button onClick={() => handleCancel(opponentId)}>초대 취소</Button>,
      onClose: () => handleCancel(opponentId),
    });
    // eslint-disable-next-line no-console
    console.log('invite', opponentId);
    socket?.emit('inviteMatch', { mode: gameMode, opponentId });
    // NOTE 왜 여기서 acceptMatch하면 되고 handleAccept에서 하면 안되지?
    socket?.on('ready', handleReady);
    socket?.on('declined', handleDeclined);
  };

  const handleAccept = (gameMode: GameModeType, opponentId: string) => {
    // eslint-disable-next-line no-console
    console.log('accept match from', opponentId);
    socket?.on('ready', handleReady);
    socket?.emit('acceptMatch', { mode: gameMode, opponentId });
  };

  const handleDecline = (opponentId: string) => {
    // eslint-disable-next-line no-console
    console.log('decline match from', opponentId);
    socket?.emit('declineMatch', { opponentId });
    setOpen(false);
  };

  const handleInvited = (gameMode: GameModeType, id: string) => {
    socket?.on('canceled', handleCanceled);
    setDialog({
      title: '매치 초대 알림',
      content: `${id}님으로부터 ${gameMode} 매치 초대가 도착하였습니다.
      수락하시겠습니까?`,
      buttons: (
        <>
          <Button onClick={() => handleAccept(gameMode, id)}>confirm</Button>
          <Button variant="outlined" onClick={() => handleDecline(id)}>decline</Button>
        </>
      ),
      onClose: () => handleDecline(id),
    });
    setOpen(true);
  };

  return {
    handleReady, handleExit, inviteUser, handleInvited,
  };
};

export default useMatch;
