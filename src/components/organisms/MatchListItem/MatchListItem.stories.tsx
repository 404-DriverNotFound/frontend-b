import React from 'react';
import { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import MatchListItem from './MatchListItem';
import List from '../../atoms/List/List';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import ContextProvider from '../../../utils/hooks/useContext';
import { MatchType } from '../../../types/Game';
import { UserInfoType } from '../../../types/User';

export default {
  title: 'organisms/MatchListItem',
  component: MatchListItem,
} as Meta;

const me: UserInfoType = {
  id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
  name: 'ME',
  avatar: '',
  status: 'OFFLINE',
};

const opposite: UserInfoType = {
  id: '661e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
  name: 'OPPOSITE',
  avatar: '',
  status: 'OFFLINE',
};

const winCase: MatchType = {
  id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
  createdAt: new Date(),
  status: 'DONE',
  type: 'LADDER',
  user1: me,
  user2: opposite,
  winner: me.id,
  loser: opposite.id,
};

const loseCase: MatchType = {
  id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
  createdAt: new Date(),
  status: 'DONE',
  type: 'LADDER',
  user1: me,
  user2: opposite,
  winner: opposite.id,
  loser: me.id,
};

const fakeList: MatchType[] = [
  winCase, loseCase, winCase, loseCase, winCase,
];

export const Default = () => (
  <MatchListItem opposite={opposite} isMeWinner createdAt={new Date()} />
);

export const WithList = () => (
  <List scroll height="15em">
    {fakeList.map((info) => (
      <MatchListItem
        opposite={info.user1.id === me.id ? info.user2 : info.user1}
        isMeWinner={info.winner !== opposite.id}
        createdAt={new Date()}
      />
    ))}
  </List>
);

export const WithTemplate = () => (
  <BrowserRouter>
    <ContextProvider>
      <MainTemplate
        main={<WithList />}
        chat={<h1>Chat</h1>}
      />
    </ContextProvider>
  </BrowserRouter>
);
