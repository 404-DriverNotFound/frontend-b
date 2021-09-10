import React from 'react';
import { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import DMListItem, { DMListItemSkeleton } from './DMListItem';
import { DMRoomType } from '../../../types/Chat';
import List from '../../atoms/List/List';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import { ContextProvider } from '../../../utils/hooks/useContext';

export default {
  title: 'organisms/DMListItem',
  component: DMListItem,
} as Meta;

const ShortMessageDMRoomInfo: DMRoomType = {
  id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
  name: 'USERNAME',
  avatar: '',
  status: 'OFFLINE',
  latestMessage: {
    content: 'Lorem ipsum dolor',
    user: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'USERNAME',
      avatar: '',
      status: 'OFFLINE',
    },
    channel: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'DEFAULT CHANNEL NAME',
      password: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    id: '550e8400-e29b-41d4-a716-446655440000',
    createdAt: new Date(),
  },
  unreads: 0,
};

const MediumMessageDMRoomInfo: DMRoomType = {
  id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
  name: 'USERNAME',
  avatar: '',
  status: 'OFFLINE',
  latestMessage: {
    content: 'Lorem ipsum dolor sit ',
    user: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'USERNAME',
      avatar: '',
      status: 'OFFLINE',
    },
    channel: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'DEFAULT CHANNEL NAME',
      password: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    id: '550e8400-e29b-41d4-a716-446655440000',
    createdAt: new Date(),
  },
  unreads: 0,
};

const LongMessageDMRoomInfo: DMRoomType = {
  id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
  name: 'USERNAME',
  avatar: '',
  status: 'OFFLINE',
  latestMessage: {
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    user: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'USERNAME',
      avatar: '',
      status: 'OFFLINE',
    },
    channel: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'DEFAULT CHANNEL NAME',
      password: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    id: '550e8400-e29b-41d4-a716-446655440000',
    createdAt: new Date(),
  },
  unreads: 0,
};

export const Default = () => <DMListItem roomInfo={ShortMessageDMRoomInfo} />;

export const SkeletonChannel = () => <DMListItemSkeleton />;

export const WithList = () => (
  <List scroll height="70vh">
    <DMListItem
      roomInfo={{
        ...ShortMessageDMRoomInfo,
        name: 'Jikang',
        status: 'ONLINE',
        unreads: 0,
      }}
    />
    <DMListItem
      roomInfo={{
        ...MediumMessageDMRoomInfo,
        name: 'Ykoh',
        status: 'IN_GAME',
        unreads: 3,
      }}
    />
    <DMListItem
      roomInfo={{
        ...LongMessageDMRoomInfo,
        name: 'Hyochoi',
        status: 'OFFLINE',
        unreads: 6,
      }}
    />
    <DMListItem
      roomInfo={{
        ...ShortMessageDMRoomInfo,
        name: 'Sujung',
        status: 'ONLINE',
        unreads: 9,
      }}
    />
    <DMListItem
      roomInfo={{
        ...MediumMessageDMRoomInfo,
        name: 'PopeKim',
        status: 'IN_GAME',
        unreads: 12,
      }}
    />
    <DMListItem
      roomInfo={{
        ...LongMessageDMRoomInfo,
        name: 'Velopert',
        status: 'OFFLINE',
        unreads: 15,
      }}
    />
    <DMListItem
      roomInfo={{
        ...ShortMessageDMRoomInfo,
        name: 'Thanos',
        status: 'ONLINE',
        unreads: 18,
      }}
    />
    <DMListItem
      roomInfo={{
        ...MediumMessageDMRoomInfo,
        name: 'SpiderMan',
        status: 'IN_GAME',
        unreads: 21,
      }}
    />
    <DMListItem
      roomInfo={{
        ...LongMessageDMRoomInfo,
        name: 'IronMan',
        status: 'OFFLINE',
        unreads: 24,
      }}
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
