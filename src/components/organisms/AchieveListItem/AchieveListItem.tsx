import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typo from '../../atoms/Typo/Typo';
import ListItem from '../../atoms/ListItem/ListItem';
import { AchievementType } from '../../../utils/achievements';

const useStyles = makeStyles({
  root: {
    padding: '0.2em',
    width: '100%',
    height: '60px',
  },
});

type AchieveListItemProps = {
  type: AchievementType,
};

const makeDateString = (date: Date) => `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

const AchieveListItem = ({ type }: AchieveListItemProps) => {
  const { icon, description, date } = type;
  const dateStr = makeDateString(date);
  const classes = useStyles();

  return (
    <ListItem>
      <Grid className={classes.root} item container justifyContent="space-around" alignItems="center">
        <Grid item container justifyContent="center" alignItems="center" xs={3}>
          {icon}
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={6}>
          <Typo variant="h6">{description}</Typo>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={3}>
          <Typo variant="body1">{dateStr}</Typo>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default AchieveListItem;
