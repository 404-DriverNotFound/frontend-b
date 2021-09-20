import React from 'react';
import { Meta } from '@storybook/react';
import { BrowserRouter, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GameWatchPage from './GameWatchPage';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
// import { RawMatchType } from '../../../types/Match';
import ContextProvider from '../../../utils/hooks/useContext';

export default {
  title: 'Pages/GameWatchPage',
  component: GameWatchPage,
} as Meta;

const useStyles = makeStyles({
  div: {
    backgroundColor: 'lightgray',
    width: '100%',
    height: '100%',
  },
});

// const SampleRawMatchType: RawMatchType = {
//   id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
//   createdAt: String(new Date()),
//   status: 'IN_PROGRESS',
//   type: 'EXHIBITON',
//   gameMode: 'CLASSIC',
//   user1: {
//     id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
//     name: 'LeftUsername',
//     avatar: '',
//     status: 'IN_GAME',
//     enable2FA: false,
//     authenticatorSecret: false,
//     isSecondFactorAuthenticated: false,
//     score: 4,
//   },
//   user2: {
//     id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
//     name: 'RightUsername',
//     avatar: '',
//     status: 'IN_GAME',
//     enable2FA: false,
//     authenticatorSecret: false,
//     isSecondFactorAuthenticated: false,
//     score: 2,
//   },
// };

export const WithMainTemplate = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <ContextProvider>
        <Route
          path={['/game/watch', '/']}
          render={() => (
            <MainTemplate
              main={<GameWatchPage />}
              chat={<div className={classes.div}>chat. 배경색은 스토리에서 적용한 것입니다!</div>}
            />
          )}
        />
      </ContextProvider>
    </BrowserRouter>
  );
};
