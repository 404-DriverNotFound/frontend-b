import Grid from '@material-ui/core/Grid';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GameModeType } from '../../../types/Match';
import CanvasManager, { RectangleType } from '../../../utils/game/CanvasManager';
import { useAppState } from '../../../utils/hooks/useAppContext';
import Typo from '../../atoms/Typo/Typo';

type GamePlayPageProps = {
  position: 'LEFT' | 'RIGHT' | null,
  mode: GameModeType | null,
  setting: any,
};

const GamePlayPage = ({ position, mode, setting }: GamePlayPageProps) => {
  const { socket } = useAppState();
  const history = useHistory();
  const [countdown, setCountDown] = useState<number | null>(null);
  const canvas = React.createRef<HTMLCanvasElement>();
  const canvasManager = useRef<CanvasManager>();

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
    canvasManager.current = new CanvasManager(canvas!.current!.getContext('2d')!, setting);

    socket?.on('update', (data) => {
      canvasManager.current?.drawBackground();
      canvasManager.current?.drawNet();
      canvasManager.current?.drawBorder();
      canvasManager.current?.drawRect(data.ball as RectangleType);
      canvasManager.current?.drawRect(data.player0 as RectangleType);
      canvasManager.current?.drawRect(data.player1 as RectangleType);
      setCountDown(data.countdown?.left || null);
    });

    socket?.on('destroy', () => {
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return setting ? (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Typo variant="h6">{countdown || 'GO!'}</Typo>
      <Typo variant="subtitle1">{position === 'LEFT' ? '< YOU' : 'YOU >'}</Typo>
      <canvas width={setting.WIDTH} height={setting.HEIGHT} ref={canvas} />
    </Grid>
  ) : <></>;
};

export default GamePlayPage;
