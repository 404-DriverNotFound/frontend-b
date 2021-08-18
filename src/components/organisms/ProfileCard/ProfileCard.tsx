import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useUserState } from '../../../utils/hooks/useContext';
import { UserInfoType } from '../../../types/User';
import Button from '../../atoms/Button/Button';
import UserProfile from '../../molecules/UserProfile/UserProfile';
import { DialogProps, initialDialog } from '../../../utils/hooks/useDialog';

const useStyles = makeStyles({
  root: {
    padding: '0.5em',
    width: '100%',
    height: '100px',
  },
  button: {
    width: '6.5em',
  },
});

type ProfileCardProps = {
  userInfo: UserInfoType,
  // eslint-disable-next-line no-unused-vars
  setOpen: (value: boolean) => void,
  // eslint-disable-next-line no-unused-vars
  setDialog: (value: DialogProps) => void,
  profile?: boolean,
};

type ButtonObjType = {
  text: string,
  onClick: React.MouseEventHandler,
};

const ProfileCard = ({
  userInfo, setOpen, setDialog, profile,
}: ProfileCardProps) => {
  const me = useUserState();
  const classes = useStyles();

  const myButton: ButtonObjType = {
    text: '정보 수정',
    onClick: () => {
      // TODO: ProfilePage와 합치기
      // FIXME: initialDialog 삭제
      setDialog(initialDialog);
      setOpen(true);
    },
  };

  const friendButton: ButtonObjType | null = (() => {
    switch (userInfo.relationship) {
      case 'NONE':
      case 'BLOCKED':
        return {
          text: '친구 요청',
          onClick: () => {},
        };
      case 'FRIEND':
        return {
          text: '친구 삭제',
          onClick: () => {},
        };
      case 'REQUESTING':
        return {
          text: '친구 요청 취소',
          onClick: () => {},
        };
      case 'REQUESTED':
        return {
          text: '친구 요청 확인',
          onClick: () => {},
        };
      case 'BLOCKING':
      default:
        return null;
    }
  })();

  const blockButton: ButtonObjType = (() => {
    switch (userInfo.relationship) {
      case 'BLOCKING':
        return {
          text: '차단 취소',
          onClick: () => {},
        };
      default:
        return {
          text: '유저 차단',
          onClick: () => {},
        };
    }
  })();

  const otherButtons: ButtonObjType[] = (() => {
    const array = [
      {
        text: 'DM',
        onClick: () => {},
      },
      {
        text: '매치 초대',
        onClick: () => {},
      },
    ];
    if (profile) return array;
    return array.concat({
      text: '프로필',
      onClick: () => {},
    });
  })();

  const buttonArray = () => {
    const array: ButtonObjType[] = [];

    if (me.id === userInfo.id) {
      array.push(myButton);
      return array;
    }
    if (friendButton) array.push(friendButton);
    if (profile) array.push(blockButton);
    return array.concat(otherButtons);
  };

  const Buttons = buttonArray().map((button) => (
    <Grid item key={button.text}>
      <Button
        className={['친구 요청 취소', '친구 요청 확인'].includes(button.text) ? '' : classes.button}
        variant={['친구 요청 취소', '친구 요청 확인'].includes(button.text) ? 'contained' : 'outlined'}
        onClick={button.onClick}
        key={button.text}
      >
        {button.text}
      </Button>
    </Grid>
  ));

  return (
    <Grid className={classes.root} item container justifyContent="space-around" alignItems="center">
      <UserProfile userInfo={userInfo} profile={profile} />
      <Grid item container justifyContent="flex-end" alignItems="center" xs={7}>
        {Buttons}
      </Grid>
    </Grid>
  );
};

ProfileCard.defaultProps = {
  profile: false,
};

export default ProfileCard;
