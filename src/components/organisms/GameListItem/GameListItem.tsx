import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typo from '../../atoms/Typo/Typo';
import { UserInfoType } from '../../../types/User';
import Avatar from '../../atoms/Avatar/Avatar';
import ListClickItem from '../../atoms/ListClickItem/ListClickItem';

const useStyles = makeStyles({
  root: {
    padding: '0.2em',
    width: '100%',
    height: '60px',
    '&:hover': { color: '#208fea' },
  },
  hover: {
    '&:hover': {
      color: '#208fea',
      cursor: 'pointer',
      backgroundColor: '#f5f5f5',
    },
  },
});

type GameListItemProps = {
  leftUser: UserInfoType,
  rightUser: UserInfoType,
  onClick: React.MouseEventHandler,
};

const GameListItem = ({ leftUser, rightUser, onClick }: GameListItemProps) => {
  const classes = useStyles();

  return (
    <ListClickItem onClick={onClick}>
      <Grid className={classes.root} item container justifyContent="space-around" alignItems="center">
        <Grid item container justifyContent="flex-end" alignItems="center" xs={4} spacing={1}>
          <Typo variant="h6">{leftUser.name}</Typo>
          <Grid item container justifyContent="center" alignItems="center" xs={4} spacing={1}>
            <Avatar src={leftUser.avatar} alt={leftUser.name} />
          </Grid>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={2}>
          <Typo variant="body1">VS</Typo>
        </Grid>
        <Grid item container justifyContent="flex-start" alignItems="center" xs={4} spacing={1}>
          <Grid item container justifyContent="center" alignItems="center" xs={4} spacing={1}>
            <Avatar src={rightUser.avatar} alt={rightUser.name} />
          </Grid>
          <Typo variant="h6">{rightUser.name}</Typo>
        </Grid>
      </Grid>
    </ListClickItem>
  );
};

export default GameListItem;
