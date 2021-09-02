import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FlagIcon from '@material-ui/icons/Flag';
import Typo from '../../atoms/Typo/Typo';
import ListItem from '../../atoms/ListItem/ListItem';
import Avatar from '../../atoms/Avatar/Avatar';
import { UserInfoType } from '../../../types/User';

const useStyles = makeStyles({
  root: {
    padding: '0.2em',
    width: '100%',
    height: '60px',
  },
});

type MatchListItemProps = {
  matchInfo: UserInfoType & { date: Date, winner: string }, // FIXME 임시 type
}

const makeDateString = (date: Date) => `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

const MatchListItem = ({ matchInfo }: MatchListItemProps) => {
  const {
    name, avatar, date, winner,
  } = matchInfo;
  const isMeWinner = winner !== name;
  const dateStr = makeDateString(date);
  const classes = useStyles();

  return (
    <ListItem>
      <Grid className={classes.root} item container justifyContent="space-around" alignItems="center">
        <Grid item container justifyContent="center" alignItems="center" xs={2}>
          <FlagIcon fontSize="large" color={isMeWinner ? 'secondary' : 'disabled'} />
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={1}>
          <Typo variant="h5">{isMeWinner ? 'WIN' : 'LOSE'}</Typo>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={2}>
          <Typo variant="body1">VS</Typo>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={1}>
          <Avatar src={avatar} alt={name} />
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={3}>
          <Typo variant="h6">{name}</Typo>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={2}>
          <Typo variant="body1">{dateStr}</Typo>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default MatchListItem;
