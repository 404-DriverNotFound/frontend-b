import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typo from '../../atoms/Typo/Typo';

const useStyles = makeStyles({
  card: {
    width: '350px',
    height: '350px',
    '&:hover': { color: '#208fea' },
  },
  cardActionMargin: {
    marginTop: '1em',
  },
  image: {
    width: '350px',
    height: '200px',
  },
  marginBottom: {
    marginBottom: '0.3em',
  },
});

type GameOptionType = 'classic' | 'speed' | 'reverse' | 'watch';

type GameOptionCardProps = {
  option: GameOptionType,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
};

const GameOptionCard = ({ option, onClick } : GameOptionCardProps) => {
  const classes = useStyles();

  const ClassicGame = () => (
    <>
      <CardMedia
        className={classes.image}
        component="img"
        alt="classic game"
        image="/images/PongNormal.png"
        title="classic game"
      />
      <CardContent>
        <Typo className={classes.marginBottom} variant="h5">Classic Game</Typo>
        <Typo variant="body1">상대방보다 먼저 5점을 획득하면 이기는 게임입니다. 키보드 방향키로 탁구채를 조작하여 공을 상대방쪽으로 넘기세요.</Typo>
      </CardContent>
    </>
  );

  const SpeedGame = () => (
    <>
      <CardMedia
        className={classes.image}
        component="img"
        alt="speed game"
        image="/images/PongSpeed.png"
        title="speed game"
      />
      <CardContent>
        <Typo className={classes.marginBottom} variant="h5">Speed Game</Typo>
        <Typo variant="body1">공이 더 빨라졌습니다. 상대방보다 먼저 5점을 획득하여 당신의 실력을 증명하세요.</Typo>
      </CardContent>
    </>
  );

  const ReverseGame = () => (
    <>
      <CardMedia
        className={classes.image}
        component="img"
        alt="reverse game"
        image="/images/ReverseArrowKeys.png"
        title="reverse game"
      />
      <CardContent>
        <Typo className={classes.marginBottom} variant="h5">Reverse Game</Typo>
        <Typo variant="body1">키보드 조작을 반대로 해야하는 이벤트 모드입니다. 이벤트 모드에서 승리하여 또 다른 재미를 느껴보세요.</Typo>
      </CardContent>
    </>
  );

  const WatchGame = () => (
    <>
      <CardMedia
        className={classes.image}
        component="img"
        alt="watch game"
        image="/images/CuteEyes.png"
        title="watch game"
      />
      <CardContent>
        <Typo className={classes.marginBottom} variant="h5">Watch Game</Typo>
        <Typo variant="body1">다른 사람들이 실시간으로 게임하는 것을 관전하세요.</Typo>
      </CardContent>
    </>
  );

  const ChooseOption = (opt: GameOptionType) => {
    switch (opt) {
      case 'watch':
        return (<WatchGame />);
      case 'speed':
        return (<SpeedGame />);
      case 'reverse':
        return (<ReverseGame />);
      case 'classic':
      default:
        return (<ClassicGame />);
    }
  };

  return (
    <CardActionArea onClick={onClick} className={classes.cardActionMargin}>
      <Card className={classes.card}>
        { ChooseOption(option) }
      </Card>
    </CardActionArea>
  );
};

export default GameOptionCard;
