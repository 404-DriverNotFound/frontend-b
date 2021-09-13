import React from 'react';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import SecurityRoundedIcon from '@material-ui/icons/SecurityRounded';
import { makeStyles } from '@material-ui/core/styles';
import { useUserState } from '../../../utils/hooks/useContext';
import ListItem from '../../atoms/ListItem/ListItem';
import Typo from '../../atoms/Typo/Typo';
import Avatar from '../../atoms/Avatar/Avatar';
import { MemberType } from '../../../types/Chat';
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
});

type ChannelUserListItemProps = {
  info: MemberType,
  myRole: 'OWNER' | 'ADMIN',
};

type ButtonObjType = {
  text: string,
  variant: 'contained' | 'outlined' | 'text' | undefined,
  onClick: React.MouseEventHandler,
};

const ChannelUserListItem = ({ info, myRole }: ChannelUserListItemProps) => {
  const {
    id, name, avatar, status, memberships,
  } = info;
  const { role, mutedAt } = memberships[0];
  const me = useUserState();
  const classes = useStyles({ status });

  if (me.id === id) return null;

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

  const makeRoleString = (): string => {
    switch (role) {
      case 'OWNER':
        return '채널 주인';
      case 'ADMIN':
        return '관리자';
      case 'BANNED':
        return '강퇴된 유저';
      default:
        return '채팅 참여자';
    }
  };

  const banButton: ButtonObjType = (() => {
    switch (role) {
      case 'BANNED':
        return {
          text: '퇴장 해제',
          variant: 'contained',
          onClick: () => {}, // FIXME: onClick 구현
        };
      default:
        return {
          text: '강제 퇴장',
          variant: 'outlined',
          onClick: () => {}, // FIXME: onClick 구현
        };
    }
  })();

  const muteButton: ButtonObjType = (() => {
    switch (mutedAt) {
      case null:
        return {
          text: '임시 차단',
          variant: 'outlined',
          onClick: () => {}, // FIXME: onClick 구현
        };
      default:
        return {
          text: '차단 해제',
          variant: 'contained',
          onClick: () => {}, // FIXME: onClick 구현
        };
    }
  })();

  // FIXME: 관리가 이미있는 데 요청되지 않도록하기
  const adminButton: ButtonObjType = (() => {
    switch (role) {
      case 'ADMIN':
        return {
          text: '관리 파직',
          variant: 'contained',
          onClick: () => {}, // FIXME: onClick 구현
        };
      default:
        return {
          text: '관리 임명',
          variant: 'outlined',
          onClick: () => {}, // FIXME: onClick 구현
        };
    }
  })();

  const buttonArray = () => {
    const array: ButtonObjType[] = [];

    array.push(banButton);
    array.push(muteButton);
    if (myRole === 'OWNER') array.push(adminButton);
    return (array);
  };

  const Buttons = buttonArray().map((button) => (
    <Grid item key={button.text}>
      <Button
        onClick={button.onClick}
        key={button.text}
        variant={button.variant}
      >
        {button.text}
      </Button>
    </Grid>
  ));

  return (
    <ListItem>
      <Grid className={classes.root} item container justifyContent="space-around" alignItems="center">
        <Grid item container justifyContent="center" alignItems="center" xs={1}>
          <Badge
            style={{ marginBottom: '0' }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            overlap="circular"
            badgeContent={['ADMIN', 'OWNER'].includes(role) ? (
              <SecurityRoundedIcon
                color={role === 'OWNER' ? 'secondary' : 'primary'}
                fontSize="small"
              />
            ) : <></>}
          >
            <Avatar src={avatar} alt={name} />
          </Badge>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={2} direction="column">
          <Typo variant="h6">{name}</Typo>
          <Typo className={classes.status} variant="subtitle1">{makeStatusString()}</Typo>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={1}>
          <Typo variant="subtitle1">{makeRoleString()}</Typo>
        </Grid>
        <Grid item container justifyContent="flex-end" alignItems="center" xs={4}>
          {role === 'OWNER' ? null : Buttons}
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ChannelUserListItem;
