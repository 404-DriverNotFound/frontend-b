import React from 'react';
import { Socket } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typo from '../../components/atoms/Typo/Typo';
import Button from '../../components/atoms/Button/Button';
import { useAppState } from './useAppContext';
import { useGameDispatch } from './useGameContext';
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

const offListeners = (socket: Socket | null) => {
  socket?.off('ready');
  socket?.off('duplicated');
  socket?.off('declined');
  socket?.off('canceled');
};

const useMatch = (setOpen: SetOpenType, setDialog: SetDialogType) => {
  const { socket } = useAppState();
  const gameDispatch = useGameDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleReady = (
    position: MatchPositionType,
    player0: RawUserInfoType,
    player1: RawUserInfoType,
    gameSetting: any,
  ) => {
    offListeners(socket);
    gameDispatch({
      type: 'ready',
      position,
      player0: { ...player0, avatar: makeAPIPath(`/${player0.avatar}`) },
      player1: { ...player1, avatar: makeAPIPath(`/${player1.avatar}`) },
      setting: gameSetting,
    });
    setOpen(false);
    history.push(PLAY_PATH);
  };

  const handleExit = (mode: GameModeType | null) => {
    // eslint-disable-next-line no-console
    console.log('exit', mode);
    offListeners(socket);
    socket?.emit('leaveGame', { type: 'LADDER', mode });
    gameDispatch({ type: 'reset' });
    setOpen(false);
  };

  const handleDeclined = ({ message }: { message: string }) => {
    offListeners(socket);
    toast.warn(message);
    gameDispatch({ type: 'reset' });
    setOpen(false);
  };

  const handleCancel = (opponentId: string) => {
    offListeners(socket);
    socket?.emit('cancelMatchInvitation', { opponentId });
    gameDispatch({ type: 'reset' });
    setOpen(false);
  };

  const inviteUser = (mode: GameModeType, opponentId: string) => {
    gameDispatch({
      type: 'setGame',
      gameType: 'EXHIBITION',
      mode,
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
    socket?.emit('inviteMatch', { mode, opponentId });
    socket?.on('ready', handleReady);
    socket?.on('declined', handleDeclined);
  };

  const handleAccept = (mode: GameModeType, opponentId: string, currentSocket: Socket) => {
    currentSocket?.on('ready', handleReady);
    currentSocket?.emit('acceptMatch', { mode, opponentId });
  };

  const handleDecline = (opponentId: string, currentSocket: Socket) => {
    gameDispatch({ type: 'reset' });
    currentSocket?.emit('declineMatch', { opponentId });
    currentSocket?.off('canceled');
    setOpen(false);
  };

  const handleCanceled = ({ message }: { message: string }) => {
    toast.warn(message);
    gameDispatch({ type: 'reset' });
    offListeners(socket);
    setOpen(false);
  };

  const handleInvited = (
    mode: GameModeType, opponent: RawUserInfoType, currentSocket: Socket,
  ) => {
    const { id, name } = opponent;
    gameDispatch({
      type: 'setGame',
      gameType: 'EXHIBITION',
      mode,
      isPlayer: true,
    });
    currentSocket?.on('canceled', handleCanceled);
    setDialog({
      title: '매치 초대 알림',
      content: `${name}님으로부터 ${mode} 매치 초대가 도착하였습니다.
      수락하시겠습니까?`,
      buttons: (
        <>
          <Button onClick={() => handleAccept(mode, id, currentSocket)}>confirm</Button>
          <Button variant="outlined" onClick={() => handleDecline(id, currentSocket)}>decline</Button>
        </>
      ),
      onClose: () => handleDecline(id, currentSocket),
    });
    setOpen(true);
  };

  return {
    handleReady, handleExit, inviteUser, handleInvited,
  };
};

export default useMatch;