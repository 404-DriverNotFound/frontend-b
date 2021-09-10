import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Typo from '../../atoms/Typo/Typo';
import ListItem from '../../atoms/ListItem/ListItem';
import { DMRoomType } from '../../../types/Chat';
import Avatar from '../../atoms/Avatar/Avatar';
import { UserStatusType } from '../../../types/User';
import Button from '../../atoms/Button/Button';

type StyleProps = { status: UserStatusType };

const useStyles = makeStyles({
  root: {
    padding: '0.2em',
    width: '100%',
    height: '60px',
  },
  status: {
    color: (props: StyleProps) => {
      switch (props.status) {
        case 'ONLINE':
          return 'lightgreen';
        case 'OFFLINE':
          return 'gray';
        case 'IN_GAME':
          return 'blue';
        default:
          return 'black';
      }
    },
  },
  badgeMargin: {
    margin: '1em 0em 1em 1em',
  },
});

const useSkeletonStyles = makeStyles({
  root: {
    padding: '0.2em',
    width: '100%',
    height: '60px',
  },
  '@keyframes loading': {
    '0%': {
      backgroundColor: 'rgba(165, 165, 165, 0.1)',
    },
    '50%': {
      backgroundColor: 'rgba(165, 165, 165, 0.3)',
    },
    '100%': {
      backgroundColor: 'rgba(165, 165, 165, 0.1)',
    },
  },
  skeleton: {
    animation: '$loading 1.8s infinite ease-in-out',
  },
  skeletonIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '18px',
  },
  skeletonName: {
    margin: '5px',
    width: '60%',
    height: '20px',
  },
  skeletonStatus: {
    margin: '5px',
    width: '35%',
    height: '15px',
  },
  skeletonTime: {
    margin: '5px',
    width: '40%',
    height: '20px',
  },
  skeletonTypo: {
    margin: '5px',
    width: '100%',
    height: '40px',
  },
  skeletonButton: {
    margin: '0.25em',
    padding: '5px 15px',
    borderRadius: '4px',
    width: '50px',
    height: '26px',
  },
});

export const DMListItemSkeleton = () => {
  const classes = useSkeletonStyles();
  return (
    <ListItem>
      <Grid className={`${classes.root}`} item container justifyContent="space-around" alignItems="center">
        <Grid item container justifyContent="center" alignItems="center" xs={1}>
          <div className={`${classes.skeletonIcon} ${classes.skeleton}`}> </div>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={2} direction="column">
          <div className={`${classes.skeletonName} ${classes.skeleton}`}> </div>
          <div className={`${classes.skeletonStatus} ${classes.skeleton}`}> </div>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={1}>
          <div className={`${classes.skeletonTime} ${classes.skeleton}`}> </div>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={4}>
          <div className={`${classes.skeletonTypo} ${classes.skeleton}`}> </div>
        </Grid>
        <Grid item container justifyContent="flex-end" alignItems="center" xs={1}>
          <div className={`${classes.skeletonButton} ${classes.skeleton}`}> </div>
        </Grid>
      </Grid>
    </ListItem>
  );
};

type DMListItemProps = {
  roomInfo: DMRoomType,
};

const makeDateString = (date: Date) => {
  const now = new Date();
  const today = `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`;
  const messageDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  if (today === messageDate) return `${date.getHours()}:${date.getMinutes()}`;
  return `${messageDate} ${date.getHours()}:${date.getMinutes()}`;
};

const handleClickToProfile = () => {
  // FIXME: 해당 유저의 프로필로
};

const handleClickToDM = () => {
  // FIXME: 해당 유저의 DM chat 입장
};

// NOTE: 처음 대화일 경우, latestMessage가 없음: avatar와 status를 가져오기 위해 latestMessage 활성화 가정 코드
const DMListItem = ({ roomInfo }: DMListItemProps) => {
  const {
    name, avatar, status, latestMessage, unreads,
  } = roomInfo;
  const { content, createdAt } = latestMessage;
  const dateStr = makeDateString(createdAt);
  const classes = useStyles({ status });

  const makeContentString = () => {
    if (content.length > 32) return `${content.substring(0, 29)}...`;
    return content;
  };

  const makeStatusString = (): string => {
    switch (status) {
      case 'ONLINE':
      case 'OFFLINE':
        return status;
      case 'IN_GAME':
        return '게임 중';
      default:
        return '';
    }
  };

  return (
    <ListItem>
      <Grid className={classes.root} item container justifyContent="space-around" alignItems="center">
        <Grid item container justifyContent="center" alignItems="center" xs={1}>
          <Avatar
            onClick={handleClickToProfile}
            src={avatar}
            alt={name}
          />
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={2} direction="column">
          <Typo variant="h6">{name}</Typo>
          <Typo className={classes.status} variant="subtitle1">{makeStatusString()}</Typo>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={1}>
          <Typo variant="subtitle2">{dateStr}</Typo>
        </Grid>
        <Grid item container justifyContent="flex-start" alignItems="center" xs={4}>
          <Typo variant="body1">{makeContentString()}</Typo>
          {unreads ? (
            <Badge color="secondary" badgeContent={unreads} max={9} className={classes.badgeMargin} />
          ) : null}
        </Grid>
        <Grid item container justifyContent="flex-end" alignItems="center" xs={2}>
          <Button variant="outlined" aria-label="go to DM" onClick={handleClickToDM}>
            DM 보기
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default DMListItem;
