import React, { useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider, useUserDispatch } from '../../../utils/hooks/useContext';
import ProfileCard, { ProfileCardProps } from './ProfileCard';
import { UserInfoType } from '../../../types/User';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';

export default {
  title: 'organisms/ProfileCard',
  component: ProfileCard,
} as Meta;

const OthersProfile: Story<ProfileCardProps> = ({ relationship }: ProfileCardProps) => {
  const handleClick = () => {};
  const userInfo: UserInfoType = {
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
    name: 'USERNAME',
    avatar: '',
    status: 'OFFLINE',
  };

  return (
    <ContextProvider>
      <ProfileCard
        userInfo={userInfo}
        relationship={relationship}
        onProfileEdit={handleClick}
        onFriendAdd={handleClick}
        onFriendRemove={handleClick}
        onUserBlock={handleClick}
        onUserUnblock={handleClick}
        onDMClick={handleClick}
        onMatchInvite={handleClick}
      />
    </ContextProvider>
  );
};

export const NoRelationProfile = OthersProfile.bind({});
NoRelationProfile.args = {
  relationship: 'none',
};

export const FriendProfile = OthersProfile.bind({});
FriendProfile.args = {
  relationship: 'friend',
};

export const BlockedProfile = OthersProfile.bind({});
BlockedProfile.args = {
  relationship: 'block',
};

const ProfileCardWithContext = () => {
  const handleClick = () => {};
  const userDispatch = useUserDispatch();
  const userInfo: UserInfoType = {
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
    name: 'MYNAME',
    avatar: '',
    status: 'ONLINE',
  };

  useEffect(() => {
    userDispatch({
      type: 'login',
      info: {
        id: userInfo.id,
        name: userInfo.name,
        avatar: userInfo.avatar,
        enable2FA: false,
      },
    });
  }, []);

  return (
    <ProfileCard
      userInfo={userInfo}
      relationship="none"
      onProfileEdit={handleClick}
      onFriendAdd={handleClick}
      onFriendRemove={handleClick}
      onUserBlock={handleClick}
      onUserUnblock={handleClick}
      onDMClick={handleClick}
      onMatchInvite={handleClick}
    />
  );
};

export const MyProfile = () => (
  <ContextProvider>
    <ProfileCardWithContext />
  </ContextProvider>
);

export const OthersProfileWithTemplate = () => {
  const handleClick = () => {};
  const userInfo: UserInfoType = {
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
    name: 'USERNAME',
    avatar: '',
    status: 'IN_GAME',
  };

  return (
    <BrowserRouter>
      <ContextProvider>
        <MainTemplate
          main={(
            <ProfileCard
              userInfo={userInfo}
              relationship="none"
              onProfileEdit={handleClick}
              onFriendAdd={handleClick}
              onFriendRemove={handleClick}
              onUserBlock={handleClick}
              onUserUnblock={handleClick}
              onDMClick={handleClick}
              onMatchInvite={handleClick}
            />
        )}
          chat={<h1>chat</h1>}
        />
      </ContextProvider>
    </BrowserRouter>
  );
};

export const MyProfileWithTemplate = () => (
  <BrowserRouter>
    <ContextProvider>
      <MainTemplate
        main={<ProfileCardWithContext />}
        chat={<h1>chat</h1>}
      />
    </ContextProvider>
  </BrowserRouter>
);
