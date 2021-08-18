import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserStateType, useUserState } from '../../../utils/hooks/useContext';
import { makeAPIPath } from '../../../utils/utils';
import List from '../../atoms/List/List';
import ListItem from '../../atoms/ListItem/ListItem';
import SubMenu from '../../molecules/SubMenu/SubMenu';
import ProfileCard, { ProfileCardSkeleton } from '../../organisms/ProfileCard/ProfileCard';

const ALL_PATH = '/community/all';
const FRIEND_PATH = '/community/friend';
const BLOCKED_PATH = '/community/block';

type ListProps = {
  API: string,
};

const list = [
  { name: 'FRIENDS LIST', link: FRIEND_PATH },
  { name: 'ALL USERS', link: ALL_PATH },
  { name: 'BLOCKED USER', link: BLOCKED_PATH },
];

const UserList = ({ API }: ListProps) => {
  const [allUsers, setAllUsers] = useState<UserStateType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { id } = useUserState();

  useEffect(() => {
    setLoading(true);
    axios.get(makeAPIPath(API))
      .finally(() => {
        setLoading(false);
      })
      .then((response) => {
        // FIXME: API 확정되면 맞춰서 고치기
        const users: UserStateType[] = response.data;
        setAllUsers(users.filter((user) => user.id !== id)
          .sort((a, b) => (a.name.localeCompare(b.name))));
      })
      .catch((error) => {
        setAllUsers([]);
        toast.error(error.message);
      });
  }, [API]);

  return (
    <>
      {(isLoading ? (
        <>
          <ListItem><ProfileCardSkeleton /></ListItem>
          <ListItem><ProfileCardSkeleton /></ListItem>
          <ListItem><ProfileCardSkeleton /></ListItem>
          <ListItem><ProfileCardSkeleton /></ListItem>
        </>
      ) : (
        allUsers.map((user) => (
          <ListItem key={user.id}>
            <ProfileCard
              // FIXME: userInfo 고치기
              userInfo={{ ...user, avatar: makeAPIPath(`/${user.avatar}`), status: 'OFFLINE' }}
              onProfileEdit={() => {}}
              onFriendAdd={() => {}}
              onUserBlock={() => {}}
              onDMClick={() => {}}
              onMatchInvite={() => {}}
            />
          </ListItem>
        ))
      ))}
    </>
  );
};

const CommunityPage = () => (
  <>
    <SubMenu current={window.location.pathname} list={list} />
    <List height="78vh" scroll>
      <Switch>
        <Route exact path={FRIEND_PATH} render={() => <UserList API="/friendship" />} />
        <Route exact path={ALL_PATH} render={() => <UserList API="/users" />} />
        <Route exact path={BLOCKED_PATH} render={() => <UserList API="/block" />} />
        <Route path="/">
          <Redirect to={FRIEND_PATH} />
        </Route>
      </Switch>
    </List>
  </>
);

export default CommunityPage;
