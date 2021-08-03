/* eslint-disable arrow-body-style */
import React from 'react';
import { Meta } from '@storybook/react';
import { makeStyles } from '@material-ui/core/styles';
import MainTemplate from './MainTemplate';

export default {
  component: MainTemplate,
  title: 'templates/MainTemplate',
} as Meta;

const useStyles = makeStyles({
  div: {
    backgroundColor: 'lightgray',
    width: '100%',
    height: '100%',
  },
});

export const Default = () => {
  const classes = useStyles();

  return (
    <MainTemplate
      main={<div className={classes.div}>main</div>}
      chat={<div className={classes.div}>chat</div>}
    />
  );
};
