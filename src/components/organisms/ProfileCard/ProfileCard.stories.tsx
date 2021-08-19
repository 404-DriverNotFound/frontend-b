import React, { useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider, useUserDispatch } from '../../../utils/hooks/useContext';
import ProfileCard from './ProfileCard';
import { RelatedInfoType } from '../../../types/User';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import Typo from '../../atoms/Typo/Typo';
import List from '../../atoms/List/List';
import ListItem from '../../atoms/ListItem/ListItem';

export default {
  title: 'organisms/ProfileCard',
  component: ProfileCard,
} as Meta;

export const OthersProfile = () => {
  const userInfo: RelatedInfoType = {
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
    name: 'USERNAME',
    avatar: '',
    status: 'OFFLINE',
    relationship: 'NONE',
  };

  return (
    <ContextProvider>
      <Typo align="center">프로필에서는 이렇게 보입니다.</Typo>
      <ProfileCard
        userInfo={{ ...userInfo, name: 'NONE' }}
        setOpen={() => {}}
        setDialog={() => {}}
        profile
      />
      <ProfileCard
        userInfo={{
          ...userInfo,
          name: 'FRIEND',
          relationship: 'FRIEND',
          status: 'ONLINE',
        }}
        setOpen={() => {}}
        setDialog={() => {}}
        profile
      />
      <ProfileCard
        userInfo={{
          ...userInfo,
          name: 'REQUESTING',
          relationship: 'REQUESTING',
          status: 'IN_GAME',
        }}
        setOpen={() => {}}
        setDialog={() => {}}
        profile
      />
      <ProfileCard
        userInfo={{ ...userInfo, name: 'REQUESTED', relationship: 'REQUESTED' }}
        setOpen={() => {}}
        setDialog={() => {}}
        profile
      />
      <ProfileCard
        userInfo={{ ...userInfo, name: 'BLOCKED', relationship: 'BLOCKED' }}
        setOpen={() => {}}
        setDialog={() => {}}
        profile
      />
      <ProfileCard
        userInfo={{ ...userInfo, name: 'BLOCKING', relationship: 'BLOCKING' }}
        setOpen={() => {}}
        setDialog={() => {}}
        profile
      />
    </ContextProvider>
  );
};

export const OthersList = () => {
  const userInfo: RelatedInfoType = {
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
    name: 'USERNAME',
    avatar: '',
    status: 'OFFLINE',
    relationship: 'NONE',
  };

  return (
    <ContextProvider>
      <Typo align="center">유저 리스트에서는 이렇게 보입니다.</Typo>
      <List height="70vh" scroll>
        <ListItem>
          <ProfileCard
            userInfo={{
              ...userInfo,
              name: 'NONE',
              relationship: 'NONE',
              status: 'ONLINE',
            }}
            setOpen={() => {}}
            setDialog={() => {}}
          />
        </ListItem>
        <ListItem>
          <ProfileCard
            userInfo={{
              ...userInfo,
              name: 'FRIEND',
              relationship: 'FRIEND',
              status: 'IN_GAME',
            }}
            setOpen={() => {}}
            setDialog={() => {}}
          />
        </ListItem>
        <ListItem>
          <ProfileCard
            userInfo={{ ...userInfo, name: 'REQUESTING', relationship: 'REQUESTING' }}
            setOpen={() => {}}
            setDialog={() => {}}
          />
        </ListItem>
        <ListItem>
          <ProfileCard
            userInfo={{ ...userInfo, name: 'REQUESTED', relationship: 'REQUESTED' }}
            setOpen={() => {}}
            setDialog={() => {}}
          />
        </ListItem>
        <ListItem>
          <ProfileCard
            userInfo={{ ...userInfo, name: 'BLOCKED', relationship: 'BLOCKED' }}
            setOpen={() => {}}
            setDialog={() => {}}
          />
        </ListItem>
        <ListItem>
          <ProfileCard
            userInfo={{ ...userInfo, name: 'BLOCKING', relationship: 'BLOCKING' }}
            setOpen={() => {}}
            setDialog={() => {}}
          />
        </ListItem>
      </List>
    </ContextProvider>
  );
};

const ProfileCardWithContext = () => {
  const userDispatch = useUserDispatch();
  const userInfo: RelatedInfoType = {
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
    name: 'ME',
    avatar: '',
    status: 'ONLINE',
    relationship: 'NONE',
  };

  useEffect(() => {
    userDispatch({
      type: 'login',
      info: {
        id: userInfo.id,
        name: userInfo.name,
        avatar: userInfo.avatar,
        enable2FA: false,
        authenticatorSecret: false,
        isSecondFactorAuthenticated: false,
      },
    });
  }, []);

  return (
    <ProfileCard
      userInfo={userInfo}
      setOpen={() => {}}
      setDialog={() => {}}
      profile
    />
  );
};

export const MyProfile = () => (
  <ContextProvider>
    <ProfileCardWithContext />
  </ContextProvider>
);

export const OthersProfileWithTemplate = () => (
  <BrowserRouter>
    <ContextProvider>
      <MainTemplate
        main={<OthersProfile />}
        chat={<h1>chat</h1>}
      />
    </ContextProvider>
  </BrowserRouter>
);

export const OthersListWithTemplate = () => (
  <BrowserRouter>
    <ContextProvider>
      <MainTemplate
        main={<OthersList />}
        chat={<h1>chat</h1>}
      />
    </ContextProvider>
  </BrowserRouter>
);

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
