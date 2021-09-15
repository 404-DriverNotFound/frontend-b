import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GameOptionCard from '../../molecules/GameOptionCard/GameOptionCard';

const useStyles = makeStyles({
  root: {
    height: '78vh',
    margin: '0.5em auto',
    backgroundColor: '#eee',
    borderRadius: '10px',
    padding: '5px 5px 1em 5px',
  },
});

const GamePage = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container justifyContent="center" alignItems="center" spacing={1}>
      <Grid item xs={6}>
        <GameOptionCard option="classic" onClick={() => {}} />
      </Grid>
      <Grid item xs={6}>
        <GameOptionCard option="speed" onClick={() => {}} />
      </Grid>
      <Grid item xs={6}>
        <GameOptionCard option="reverse" onClick={() => {}} />
      </Grid>
      <Grid item xs={6}>
        <GameOptionCard option="watch" onClick={() => {}} />
      </Grid>
    </Grid>
  );
};

export default GamePage;
