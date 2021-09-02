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

type GameOptionCardProps = { option: GameOptionType };

const GameOptionCard = ({ option } : GameOptionCardProps) => {
  const classes = useStyles();

  const ClassicGame = () => (
    <CardActionArea className={classes.card}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          component="img"
          alt="classic game"
          image="https://w7.pngwing.com/pngs/346/294/png-transparent-wikimedia-commons-ping-pong-paddles-sets-computer-font-ping-orange-wikimedia-commons-table-tennis-racket.png"
          title="classic game"
        />
        <CardContent>
          <Typo className={classes.marginBottom} variant="h5">Classic Game</Typo>
          <Typo variant="body1">상대방보다 먼저 5점을 획득하면 이기는 게임입니다. 키보드 방향키로 탁구채를 조작하여 공을 상대방쪽으로 넘기세요.</Typo>
        </CardContent>
      </Card>
    </CardActionArea>
  );

  const SpeedGame = () => (
    <CardActionArea className={classes.card}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          component="img"
          alt="speed game"
          image="https://www.pikpng.com/pngl/m/109-1095985_table-tennis-ping-pong-table-tennis-bat-ping.png"
          title="speed game"
        />
        <CardContent>
          <Typo className={classes.marginBottom} variant="h5">Speed Game</Typo>
          <Typo variant="body1">공이 더 빨라졌습니다. 상대방보다 먼저 5점을 획득하여 당신의 실력을 증명하세요.</Typo>
        </CardContent>
      </Card>
    </CardActionArea>
  );

  const ReverseGame = () => (
    <CardActionArea className={classes.card}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          component="img"
          alt="reverse game"
          image="https://user-images.githubusercontent.com/59194905/131792847-ed46cab6-7971-4002-a999-b0e589a5494d.png"
          title="reverse game"
        />
        <CardContent>
          <Typo className={classes.marginBottom} variant="h5">Reverse Game</Typo>
          <Typo variant="body1">키보드 조작을 반대로 해야하는 이벤트 모드입니다. 이벤트 모드에서 승리하여 또 다른 재미를 느껴보세요.</Typo>
        </CardContent>
      </Card>
    </CardActionArea>
  );

  const WatchGame = () => (
    <CardActionArea className={classes.card}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          component="img"
          alt="watch game"
          image="https://e7.pngegg.com/pngimages/616/794/png-clipart-googly-eyes-cartoon-cartoon-s-of-eyes-eyes-illustration-text-smiley.png"
          title="watch game"
        />
        <CardContent>
          <Typo className={classes.marginBottom} variant="h5">Watch Game</Typo>
          <Typo variant="body1">다른 사람들이 실시간으로 게임하는 것을 관전하세요.</Typo>
        </CardContent>
      </Card>
    </CardActionArea>
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

  return (<>{ ChooseOption(option) }</>);
};

export default GameOptionCard;
