import React from 'react';
import { Meta } from '@storybook/react';
import ChannelUserListItem from './ChannelUserListItem';
import { MemberType } from '../../../types/Chat';

export default {
  title: 'organisms/ChannelUserListItem',
  component: ChannelUserListItem,
} as Meta;

const dummyUserListItem: MemberType = {
  id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
  name: 'USERNAME',
  avatar: '',
  status: 'ONLINE',
  memberships: ['MEMBER', new Date(), null],
};

export const Default = () => <ChannelUserListItem info={dummyUserListItem} myRole="OWNER" />;
