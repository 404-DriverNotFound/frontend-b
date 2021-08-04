import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: '1440px',
  },
  grid: {
    padding: '1em',
    height: '90vh',
  },
});

type MainTemplateProps = {
  main: React.ReactElement,
  chat: React.ReactElement,
};

const MainTemplate = ({ main, chat }: MainTemplateProps) => {
  const classes = useStyles();

  // FIXME: Menu 컴포넌트 집어넣기
  return (
    <>
      <AppBar>TEMP MENU</AppBar>
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
