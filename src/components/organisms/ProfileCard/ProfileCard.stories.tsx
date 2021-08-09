import React from 'react';
import { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from '../../../utils/hooks/useContext';
import ProfileCard from './ProfileCard';
import { UserInfoType } from '../../../types/User';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';

export default {
  title: 'organisms/ProfileCard',
  component: ProfileCard,
} as Meta;

export const Default = () => {
  const handleClick = () => {};
  const userInfo: UserInfoType = {
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
    name: 'USERNAME',
    avatar: '',
    status: 'ONLINE',
  };

  return (
    <ContextProvider>
      <ProfileCard
        userInfo={userInfo}
        onProfileEdit={handleClick}
        onFriendAdd={handleClick}
        onUserBlock={handleClick}
        onDMClick={handleClick}
        onMatchInvite={handleClick}
      />
    </ContextProvider>
  );
};

export const WithTemplate = () => {
  const handleClick = () => {};
  const userInfo: UserInfoType = {
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
    name: 'USERNAME',
    avatar: '',
    status: 'ONLINE',
  };

  return (
    <BrowserRouter>
      <ContextProvider>
        <MainTemplate
          main={(
            <ProfileCard
              onProfileEdit={handleClick}
              onFriendAdd={handleClick}
              onUserBlock={handleClick}
              onDMClick={handleClick}
              onMatchInvite={handleClick}
              userInfo={userInfo}
            />
        )}
          chat={<h1>chat</h1>}
        />
      </ContextProvider>
    </BrowserRouter>
  );
};
