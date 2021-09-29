import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { UserInfoType } from '../../../types/User';
import Avatar from '../../atoms/Avatar/Avatar';
import Typo from '../../atoms/Typo/Typo';

// FIXME: 임시 Type 작성
export type UserGameInfoType = UserInfoType & { win: number, lose: number };

type PlayerProfileProps = {
  userGameInfo: UserGameInfoType,
};

const useStyles = makeStyles({
  root: {
    padding: '0.2em',
    width: '13vw',
    height: '100%',
  },
});

const PlayerProfile = ({ userGameInfo }: PlayerProfileProps) => {
  const {
    name, avatar, win, lose,
  } = userGameInfo;
  const classes = useStyles();

  const makeMatchHistoryString = (): string => (`전적 ${win}승 ${lose}패`);

  return (
    <Grid className={classes.root} item container xs={12} direction="column" justifyContent="center" alignItems="center">
      <Avatar src={avatar} alt={name} />
      <Typo variant="body1">{name}</Typo>
      <Typo variant="body2">
        {makeMatchHistoryString()}
      </Typo>
    </Grid>
  );
};

export default PlayerProfile;
