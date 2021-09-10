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
  name: 'USERNAME',
  latestMessage: {
    content: 'Lorem ipsum dolor sit amet',
    user: {
      id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
      name: 'USERNAME',
      avatar: '',
      status: 'OFFLINE',
    },
    channel: {
      id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
      name: 'DEFAULT CHANNEL NAME',
      password: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
    createdAt: new Date(),
  },
  unreads: 0,
};

const MediumMessageDMRoomInfo: DMRoomType = {
  name: 'USERNAME',
  latestMessage: {
    content: 'Lorem ipsum dolor sit amet, consectetur ',
    user: {
      id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
      name: 'USERNAME',
      avatar: '',
      status: 'OFFLINE',
    },
    channel: {
      id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
      name: 'DEFAULT CHANNEL NAME',
      password: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
    createdAt: new Date(),
  },
  unreads: 0,
};

const LongMessageDMRoomInfo: DMRoomType = {
  name: 'USERNAME',
  latestMessage: {
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    user: {
      id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
      name: 'USERNAME',
      avatar: '',
      status: 'OFFLINE',
    },
    channel: {
      id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
      name: 'DEFAULT CHANNEL NAME',
      password: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
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
        latestMessage: {
          ...ShortMessageDMRoomInfo.latestMessage,
          user: { ...ShortMessageDMRoomInfo.latestMessage.user, name: 'Jikang', status: 'ONLINE' },
        },
      }}
    />
    <DMListItem
      roomInfo={{
        ...MediumMessageDMRoomInfo,
        latestMessage: {
          ...MediumMessageDMRoomInfo.latestMessage,
          user: { ...MediumMessageDMRoomInfo.latestMessage.user, name: 'Ykoh', status: 'IN_GAME' },
        },
      }}
    />
    <DMListItem
      roomInfo={{
        ...LongMessageDMRoomInfo,
        latestMessage: {
          ...LongMessageDMRoomInfo.latestMessage,
          user: { ...LongMessageDMRoomInfo.latestMessage.user, name: 'Hyochoi', status: 'OFFLINE' },
        },
      }}
    />
    <DMListItem
      roomInfo={{
        ...ShortMessageDMRoomInfo,
        latestMessage: {
          ...ShortMessageDMRoomInfo.latestMessage,
          user: { ...ShortMessageDMRoomInfo.latestMessage.user, name: 'Sujung', status: 'ONLINE' },
        },
      }}
    />
    <DMListItem
      roomInfo={{
        ...MediumMessageDMRoomInfo,
        latestMessage: {
          ...MediumMessageDMRoomInfo.latestMessage,
          user: { ...MediumMessageDMRoomInfo.latestMessage.user, name: 'PopeKim', status: 'IN_GAME' },
        },
      }}
    />
    <DMListItem
      roomInfo={{
        ...LongMessageDMRoomInfo,
        latestMessage: {
          ...LongMessageDMRoomInfo.latestMessage,
          user: { ...LongMessageDMRoomInfo.latestMessage.user, name: 'Velopert', status: 'OFFLINE' },
        },
      }}
    />
    <DMListItem
      roomInfo={{
        ...ShortMessageDMRoomInfo,
        latestMessage: {
          ...ShortMessageDMRoomInfo.latestMessage,
          user: { ...ShortMessageDMRoomInfo.latestMessage.user, name: 'Thanos', status: 'ONLINE' },
        },
      }}
    />
    <DMListItem
      roomInfo={{
        ...MediumMessageDMRoomInfo,
        latestMessage: {
          ...MediumMessageDMRoomInfo.latestMessage,
          user: { ...MediumMessageDMRoomInfo.latestMessage.user, name: 'SpiderMan', status: 'IN_GAME' },
        },
      }}
    />
    <DMListItem
      roomInfo={{
        ...LongMessageDMRoomInfo,
        latestMessage: {
          ...LongMessageDMRoomInfo.latestMessage,
          user: { ...LongMessageDMRoomInfo.latestMessage.user, name: 'IronMan', status: 'OFFLINE' },
        },
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
