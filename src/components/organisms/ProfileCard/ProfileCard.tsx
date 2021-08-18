import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useUserState } from '../../../utils/hooks/useContext';
import { UserInfoType } from '../../../types/User';
import Button from '../../atoms/Button/Button';
import UserProfile from '../../molecules/UserProfile/UserProfile';

const useStyles = makeStyles({
  root: {
    padding: '0.5em',
    width: '100%',
    height: '100px',
  },
  button: {
    width: '6.5em',
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
  skeletonCard: {
    padding: '0.5em',
    width: '100%',
    height: '100px',
  },
  skeletonAvatar: {
    width: '72px',
    height: '72px',
    borderRadius: '36px',
  },
  skeletonTypo: {
    margin: '5px',
    width: '90%',
    height: '20px',
  },
  skeletonButton: {
    margin: '0.25em',
    padding: '5px 15px',
    borderRadius: '4px',
    width: '61px',
    height: '26px',
  },
});

export const ProfileCardSkeleton = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.skeletonCard} item container justifyContent="space-around" alignItems="center">
      <Grid item container justifyContent="space-around" alignItems="center" xs={5}>
        <Grid container item xs={6} justifyContent="center">
          <div className={`${classes.skeletonAvatar} ${classes.skeleton}`}>{}</div>
        </Grid>
        <Grid item xs={6}>
          <div className={`${classes.skeletonTypo} ${classes.skeleton}`}> </div>
          <div className={`${classes.skeletonTypo} ${classes.skeleton}`}> </div>
        </Grid>
      </Grid>
      <Grid item container justifyContent="flex-end" alignItems="center" xs={7}>
        <div className={`${classes.skeletonButton} ${classes.skeleton}`}> </div>
        <div className={`${classes.skeletonButton} ${classes.skeleton}`}> </div>
        <div className={`${classes.skeletonButton} ${classes.skeleton}`}> </div>
        <div className={`${classes.skeletonButton} ${classes.skeleton}`}> </div>
      </Grid>
    </Grid>
  );
};

type ProfileCardProps = {
  userInfo: UserInfoType,
  onProfileEdit: React.MouseEventHandler,
  onFriendAdd: React.MouseEventHandler,
  onUserBlock: React.MouseEventHandler,
  onDMClick: React.MouseEventHandler,
  onMatchInvite: React.MouseEventHandler,
};

type ButtonObjType = {
  text: string,
  onClick: React.MouseEventHandler,
};

const ProfileCard = ({
  userInfo, onProfileEdit, onFriendAdd, onUserBlock, onDMClick, onMatchInvite,
}: ProfileCardProps) => {
  const me = useUserState();
  const classes = useStyles({ status: userInfo.status });

  const myButtons: ButtonObjType[] = [
    {
      text: '정보 수정',
      onClick: onProfileEdit,
    },
  ];

  const otherButtons: ButtonObjType[] = [
    {
      text: '친구 추가',
      onClick: onFriendAdd,
    },
    {
      text: '유저 차단',
      onClick: onUserBlock,
    },
    {
      text: 'DM',
      onClick: onDMClick,
    },
    {
      text: '매치 초대',
      onClick: onMatchInvite,
    },
  ];

  const buttonArray = me.id === userInfo.id ? myButtons : otherButtons;

  const Buttons = buttonArray.map((button) => (
    <Grid item key={button.text}>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={button.onClick}
        key={button.text}
      >
        {button.text}
      </Button>
    </Grid>
  ));

  return (
    <Grid className={classes.root} item container justifyContent="space-around" alignItems="center">
      <UserProfile userInfo={userInfo} />
      <Grid item container justifyContent="flex-end" alignItems="center" xs={7}>
        {Buttons}
      </Grid>
    </Grid>
  );
};

export default ProfileCard;
