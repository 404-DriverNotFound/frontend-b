import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Typo from '../../atoms/Typo/Typo';
import { DialogProps } from '../../../utils/hooks/useDialog';
import ListItem from '../../atoms/ListItem/ListItem';
import { MessageType } from '../../../types/Chat';
import Avatar from '../../atoms/Avatar/Avatar';
import { UserStatusType } from '../../../types/User';

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

// FIXME: Dialog, setOpen 구현하기
type DMListItemProps = {
  info: MessageType,
  // eslint-disable-next-line no-unused-vars
  setOpen: (value: boolean) => void,
  // eslint-disable-next-line no-unused-vars
  setDialog: (value: DialogProps) => void,
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

const DMListItem = ({
  // eslint-disable-next-line no-unused-vars
  info, setOpen, setDialog,
}: DMListItemProps) => {
  const { user, content, createdAt } = info;
  const { status } = user;
  const dateStr = makeDateString(createdAt);
  const classes = useStyles({ status });

  const makeContentString = () => {
    if (content.length > 104) return `${content.substring(0, 101)}...`;
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
            src={user.avatar}
            alt={user.name}
          />
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={2} direction="column">
          <Typo variant="h6">{user.name}</Typo>
          <Typo className={classes.status} variant="subtitle1">{makeStatusString()}</Typo>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={1}>
          <Typo variant="subtitle2">{dateStr}</Typo>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={4}>
          <Typo variant="body1">{makeContentString()}</Typo>
        </Grid>
        <Grid item container justifyContent="flex-end" alignItems="center" xs={1}>
          <IconButton color="primary" aria-label="go to DM" onClick={handleClickToDM}>
            <ChatBubbleOutlineIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default DMListItem;
