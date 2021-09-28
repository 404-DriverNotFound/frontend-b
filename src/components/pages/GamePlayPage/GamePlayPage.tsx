import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import CanvasManager, { RectangleType } from '../../../utils/game/CanvasManager';
import { useAppState } from '../../../utils/hooks/useAppContext';
import useDialog from '../../../utils/hooks/useDialog';
import { useGameDispatch, useGameState } from '../../../utils/hooks/useGameContext';
import Button from '../../atoms/Button/Button';
import Typo from '../../atoms/Typo/Typo';
import Dialog from '../../molecules/Dialog/Dialog';

type StyleProps = { width: number };

const useStyles = makeStyles({
  root: {
    width: ({ width }: StyleProps) => width || '100%',
  },
});

type PlayStateType = 'init' | 'ready' | 'playing' | 'end';

type PlayerStateType = {
  score: number,
  ready: boolean,
};

const initialPlayerState = { score: 0, ready: false };

const makeCountString = (count: number, state: PlayStateType): string => {
  switch (state) {
    case 'init':
      if (count) return `${count}초 안에 ready 버튼을 누르세요.`;
      return '준비 가능 시간을 초과하였습니다.';
    case 'ready':
      return '상대 플레이어가 준비되기를 기다리고 있습니다.';
    case 'playing':
      if (count > 0) return `게임 시작까지 ${count}초`;
      return 'GAME START!';
    case 'end':
    default:
      if (count > 0) return `게임 종료까지 ${count}초`;
      return 'GAME END';
  }
};

const GamePlayPage = () => {
  const { socket } = useAppState();
  const history = useHistory();
  const { mode, setting, position } = useGameState();
  const gameDispatch = useGameDispatch();
  const [state, setState] = useState<PlayStateType>('init');
  const [countdown, setCountDown] = useState<number | null>(null);
  const [playerState, setPlayerState] = useState<
    PlayerStateType[]>([initialPlayerState, initialPlayerState]);
  const canvas = React.createRef<HTMLCanvasElement>();
  const canvasManager = useRef<CanvasManager>();
  const classes = useStyles(setting?.WIDTH);
  const {
    isOpen, setOpen, dialog, setDialog,
  } = useDialog();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
      e.preventDefault();
      socket?.emit('keydown', e.code === 'ArrowUp' ? 38 : 40);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
      e.preventDefault();
      socket?.emit('keyup', e.code === 'ArrowUp' ? 38 : 40);
    }
  };

  useEffect(() => {
    if (!setting || !position || !mode) {
      toast.error('잘못된 접근입니다.');
      history.goBack();
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    if (canvas.current) canvasManager.current = new CanvasManager(canvas.current.getContext('2d')!, setting);

    socket?.on('playing', () => setState('playing'));

    socket?.on('update', (data) => {
      canvasManager.current?.drawBackground();
      canvasManager.current?.drawNet();
      canvasManager.current?.drawBorder();
      canvasManager.current?.drawRect(data.ball as RectangleType);
      canvasManager.current?.drawRect(data.player0 as RectangleType);
      canvasManager.current?.drawRect(data.player1 as RectangleType);
      setCountDown(data.countdown?.left || null);
      setPlayerState([
        { score: data.player0.score, ready: data.player0.ready },
        { score: data.player1.score, ready: data.player1.ready },
      ]);
    });

    socket?.on('destroy', (message) => {
      const handleClose = () => {
        history.goBack();
      };
      setState('end');
      setDialog({
        content: message || '게임이 종료되었습니다.',
        buttons: <Button onClick={handleClose}>Exit</Button>,
        onClose: handleClose,
      });
      setOpen(true);
    });

    return () => {
      if (![playerState[0].score, playerState[1].score].includes(5)) socket?.emit('leaveGame');
      setOpen(false);
      gameDispatch({ type: 'reset' });
      socket?.off('update');
      socket?.off('destroy');
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return setting ? (
    <>
      <Dialog
        isOpen={isOpen}
        title={dialog.title}
        content={dialog.content}
        buttons={dialog.buttons}
        onClose={dialog.onClose}
      />
      <Grid container className={classes.root} direction="column" justifyContent="center" alignItems="center">
        <Grid item container justifyContent="center" alignItems="center">
          <Button onClick={() => { if (socket?.emit('ready')) setState('ready'); }} disabled={state !== 'init'}>ready</Button>
          <Button onClick={() => { if (socket?.emit('leaveGame')) setState('end'); }}>exit</Button>
        </Grid>
        <Typo variant="h6">{mode}</Typo>
        <Typo variant="h5">{makeCountString(countdown || 0, [playerState[0].score, playerState[1].score].includes(5) ? 'end' : state)}</Typo>
        <Grid item container justifyContent="space-evenly" alignItems="center">
          <Typo variant="h6">{playerState[0].score}</Typo>
          <Typo variant="body1">SCORE</Typo>
          <Typo variant="h6">{playerState[1].score}</Typo>
        </Grid>
        <canvas width={setting.WIDTH} height={setting.HEIGHT} ref={canvas} />
        <Grid item container className={classes.root} justifyContent={position === 'LEFT' ? 'flex-start' : 'flex-end'} alignItems="center">
          <Typo variant="h6">YOU</Typo>
        </Grid>
      </Grid>
    </>
  ) : <></>;
};

export default GamePlayPage;
