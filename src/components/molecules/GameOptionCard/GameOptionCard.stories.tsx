import React from 'react';
import { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import GameOptionCard from './GameOptionCard';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import { ContextProvider } from '../../../utils/hooks/useContext';

export default {
  title: 'molecules/GameOptionCard',
  component: GameOptionCard,
} as Meta;

const useStyles = makeStyles({
  div: {
    backgroundColor: 'lightgray',
    width: '100%',
    height: '100%',
  },
});

export const Watch = () => <GameOptionCard option="watch" />;

export const WithMainTemplate = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <ContextProvider>
        <MainTemplate
          main={(
            <Grid container>
              <Grid item>
                <GameOptionCard option="classic" />
              </Grid>
              <Grid item>
                <GameOptionCard option="speed" />
              </Grid>
              <Grid item>
                <GameOptionCard option="reverse" />
              </Grid>
              <Grid item>
                <GameOptionCard option="watch" />
              </Grid>
            </Grid>
          )}
          chat={<div className={classes.div}>chat. 배경색은 스토리에서 적용한 것입니다!</div>}
        />
      </ContextProvider>
    </BrowserRouter>
  );
};
