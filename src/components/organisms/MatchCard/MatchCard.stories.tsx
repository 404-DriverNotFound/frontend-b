import React from 'react';
import { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import MatchCard from './MatchCard';
import List from '../../atoms/List/List';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import { ContextProvider } from '../../../utils/hooks/useContext';
import { UserInfoType } from '../../../types/User';

export default {
  title: 'organisms/MatchCard',
  component: MatchCard,
} as Meta;

type matchType = UserInfoType & { date: Date, winner: string }; // FIXME 임시 type

const dummyWinner: matchType = {
  id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
  name: 'WINNER',
  avatar: '',
  status: 'OFFLINE',
  date: new Date(),
  winner: 'WINNER',
};

const dummyLoser: matchType = {
  id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
  name: 'LOSER',
  avatar: '',
  status: 'OFFLINE',
  date: new Date(),
  winner: 'WINNER',
};

const fakeList: matchType[] = [
  dummyWinner, dummyLoser, dummyWinner, dummyLoser, dummyWinner,
];

export const DefaultWithList = () => (
  <List scroll height="15em">
    {fakeList.map((info) => <MatchCard matchInfo={info} />)}
  </List>
);

export const WithTemplate = () => (
  <BrowserRouter>
    <ContextProvider>
      <MainTemplate
        main={<DefaultWithList />}
        chat={<h1>Chat</h1>}
      />
    </ContextProvider>
  </BrowserRouter>
);
