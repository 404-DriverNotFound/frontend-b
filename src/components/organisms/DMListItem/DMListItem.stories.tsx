import React from 'react';
import { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import DMListItem, { DMListItemSkeleton } from './DMListItem';
import { MessageType, RawChannelType } from '../../../types/Chat';
import List from '../../atoms/List/List';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import { ContextProvider } from '../../../utils/hooks/useContext';

export default {
  title: 'organisms/DMListItem',
  component: DMListItem,
} as Meta;

const channel: RawChannelType = {
  id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
  name: 'temp',
  password: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const shortMessage: MessageType = {
  id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
  content: 'Lorem ipsum dolor sit amet',
  createdAt: new Date(),
  user: {
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
    name: 'USERNAME',
    avatar: '',
    status: 'OFFLINE',
  },
  channel,
};

const mediumMessage: MessageType = {
  id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
  content: 'Lorem ipsum dolor sit amet, consectetur',
  createdAt: new Date(),
  user: {
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
    name: 'USERNAME',
    avatar: '',
    status: 'OFFLINE',
  },
  channel,
};

const longMessage: MessageType = {
  id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  createdAt: new Date(),
  user: {
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
    name: 'USERNAME',
    avatar: '',
    status: 'ONLINE',
  },
  channel,
};

export const Default = () => (
  <DMListItem
    info={longMessage}
    setOpen={() => {}}
    setDialog={() => {}}
  />
);

export const SkeletonChannel = () => <DMListItemSkeleton />;

export const WithList = () => (
  <List scroll height="70vh">
    <DMListItem
      info={{ ...shortMessage, user: { ...shortMessage.user, name: 'Ykoh', status: 'IN_GAME' } }}
      setOpen={() => {}}
      setDialog={() => {}}
    />
    <DMListItem
      info={{ ...mediumMessage, user: { ...mediumMessage.user, name: 'Hyochoi', status: 'OFFLINE' } }}
      setOpen={() => {}}
      setDialog={() => {}}
    />
    <DMListItem
      info={{
        ...longMessage,
        user: {
          ...longMessage.user, name: 'Jikang', avatar: 'https://cdn.intra.42.fr/users/medium_jikang.jpg', status: 'ONLINE',
        },
      }}
      setOpen={() => {}}
      setDialog={() => {}}
    />
    <DMListItem
      info={{ ...shortMessage, user: { ...shortMessage.user, name: 'Sujung', status: 'IN_GAME' } }}
      setOpen={() => {}}
      setDialog={() => {}}
    />
    <DMListItem
      info={{ ...mediumMessage, user: { ...mediumMessage.user, name: 'PopeKim', status: 'OFFLINE' } }}
      setOpen={() => {}}
      setDialog={() => {}}
    />
    <DMListItem
      info={{ ...longMessage, user: { ...longMessage.user, name: 'Velopert', status: 'ONLINE' } }}
      setOpen={() => {}}
      setDialog={() => {}}
    />
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
