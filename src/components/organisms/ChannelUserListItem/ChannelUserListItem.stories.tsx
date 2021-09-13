import React from 'react';
import { Meta } from '@storybook/react';
import ChannelUserListItem from './ChannelUserListItem';
import List from '../../atoms/List/List';
import { MemberType } from '../../../types/Chat';
import { ContextProvider } from '../../../utils/hooks/useContext';

export default {
  title: 'organisms/ChannelUserListItem',
  component: ChannelUserListItem,
} as Meta;

const dummyUserListItem: MemberType = {
  id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
  name: 'USERNAME',
  avatar: '',
  status: 'ONLINE',
  memberships: [{ role: 'MEMBER', createdAt: new Date(), mutedAt: null }],
};

export const Default = () => (
  <ContextProvider>
    <ChannelUserListItem info={dummyUserListItem} myRole="OWNER" />
  </ContextProvider>
);

export const IamOwnerWithList = () => (
  <ContextProvider>
    <List scroll height="70vh">
      <ChannelUserListItem
        info={{
          ...dummyUserListItem,
          name: 'MutedMember',
          memberships: [{ role: 'MEMBER', createdAt: new Date(), mutedAt: new Date() }],
        }}
        myRole="OWNER"
      />
      <ChannelUserListItem
        info={{
          ...dummyUserListItem,
          name: 'BannedMember',
          status: 'IN_GAME',
          memberships: [{ role: 'BANNED', createdAt: new Date(), mutedAt: new Date() }],
        }}
        myRole="OWNER"
      />
      <ChannelUserListItem
        info={{
          ...dummyUserListItem,
          name: 'generalMember',
          status: 'OFFLINE',
          memberships: [{ role: 'MEMBER', createdAt: new Date(), mutedAt: new Date() }],
        }}
        myRole="OWNER"
      />
      <ChannelUserListItem
        info={{
          ...dummyUserListItem,
          name: 'I am Admin',
          memberships: [{ role: 'ADMIN', createdAt: new Date(), mutedAt: new Date() }],
        }}
        myRole="OWNER"
      />
    </List>
  </ContextProvider>
);

export const IamAdminWithList = () => (
  <ContextProvider>
    <List scroll height="70vh">
      <ChannelUserListItem
        info={{
          ...dummyUserListItem,
          name: 'MutedMember',
          memberships: [{ role: 'MEMBER', createdAt: new Date(), mutedAt: new Date() }],
        }}
        myRole="ADMIN"
      />
      <ChannelUserListItem
        info={{
          ...dummyUserListItem,
          name: 'BannedMember',
          status: 'IN_GAME',
          memberships: [{ role: 'BANNED', createdAt: new Date(), mutedAt: new Date() }],
        }}
        myRole="ADMIN"
      />
      <ChannelUserListItem
        info={{
          ...dummyUserListItem,
          name: 'generalMember',
          status: 'OFFLINE',
          memberships: [{ role: 'MEMBER', createdAt: new Date(), mutedAt: new Date() }],
        }}
        myRole="ADMIN"
      />
      <ChannelUserListItem
        info={{
          ...dummyUserListItem,
          name: 'I am OWNER',
          memberships: [{ role: 'OWNER', createdAt: new Date(), mutedAt: new Date() }],
        }}
        myRole="ADMIN"
      />
    </List>
  </ContextProvider>
);
