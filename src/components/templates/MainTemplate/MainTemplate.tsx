import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '../../molecules/Menu/Menu';

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    marginTop: '64px',
    maxWidth: '1440px',
  },
  grid: {
    padding: '1em',
    height: '85vh',
  },
});

type MainTemplateProps = {
  main: React.ReactElement,
  chat: React.ReactElement,
};

const MainTemplate = ({ main, chat }: MainTemplateProps) => {
  const classes = useStyles();

  return (
    <>
      <Menu />
      <Grid container className={classes.root} justifyContent="space-evenly">
        <Grid item className={classes.grid} xs={8}>
          {main}
        </Grid>
        <Grid item className={classes.grid} xs={4}>
          {chat}
        </Grid>
      </Grid>
    </>
  );
};

export default MainTemplate;
