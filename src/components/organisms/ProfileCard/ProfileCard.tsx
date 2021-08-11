import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useUserState } from '../../../utils/hooks/useContext';
import { RelationshipType, UserInfoType } from '../../../types/User';
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
});

export type ProfileCardProps = {
  userInfo: UserInfoType,
  relationship: RelationshipType,
  onProfileEdit: React.MouseEventHandler,
  onFriendAdd: React.MouseEventHandler,
  onFriendRemove: React.MouseEventHandler,
  onUserBlock: React.MouseEventHandler,
  onUserUnblock: React.MouseEventHandler,
  onDMClick: React.MouseEventHandler,
  onMatchInvite: React.MouseEventHandler,
};

type ButtonObjType = {
  text: string,
  onClick: React.MouseEventHandler,
};

const ProfileCard = ({
  userInfo, relationship, onProfileEdit, onFriendAdd, onFriendRemove,
  onUserBlock, onUserUnblock, onDMClick, onMatchInvite,
}: ProfileCardProps) => {
  const me = useUserState();
  const classes = useStyles({ status: userInfo.status });

  const myButtons: ButtonObjType[] = [
    {
      text: '정보 수정',
      onClick: onProfileEdit,
    },
  ];

  const otherButtons: (ButtonObjType | null)[] = [
    (() => {
      switch (relationship) {
        case 'friend':
          return {
            text: '친구 삭제',
            onClick: onFriendRemove,
          };
        case 'none':
          return {
            text: '친구 추가',
            onClick: onFriendAdd,
          };
        case 'block':
        default:
          return null;
      }
    }
    )(),
    relationship === 'block' ? (
      {
        text: '차단 취소',
        onClick: onUserUnblock,
      }
    ) : (
      {
        text: '유저 차단',
        onClick: onUserBlock,
      }
    ),
    {
      text: 'DM',
      onClick: onDMClick,
    },
    {
      text: '매치 초대',
      onClick: onMatchInvite,
    },
    // TODO: 채팅, 게임 구현 후, 버튼 표시 여부 결정하기
  ];

  const buttonArray = me.id === userInfo.id ? myButtons : otherButtons;

  const Buttons = buttonArray.map((button) => {
    if (button) {
      return (
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
      );
    }
    return null;
  });

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
