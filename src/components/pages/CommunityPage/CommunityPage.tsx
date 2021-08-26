import React, { useEffect, useState } from 'react';
import {
  Redirect, Route, Switch, useParams,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserState } from '../../../utils/hooks/useContext';
import { asyncGetRequest, makeAPIPath } from '../../../utils/utils';
import List from '../../atoms/List/List';
import ListItem from '../../atoms/ListItem/ListItem';
import SubMenu from '../../molecules/SubMenu/SubMenu';
import ProfileCard, { ProfileCardSkeleton } from '../../organisms/ProfileCard/ProfileCard';
import { RelatedInfoType, UserInfoType } from '../../../types/User';
import { RawUserInfoType } from '../../../types/Response';
import useDialog from '../../../utils/hooks/useDialog';
import Dialog from '../../molecules/Dialog/Dialog';

const ALL_PATH = '/community/all';
const FRIEND_PATH = '/community/friend';
const BLOCKED_PATH = '/community/block';

type ListProps = {
  users: RelatedInfoType[],
};

const list = [
  { name: 'ALL USERS', link: ALL_PATH },
  { name: 'FRIENDS LIST', link: FRIEND_PATH },
  { name: 'BLOCKED USER', link: BLOCKED_PATH },
];
const CommunityPage = () => {
  const [allUsers, setAllUsers] = useState<RelatedInfoType[]>([]);
  const [allFriends, setAllFriends] = useState<RelatedInfoType[]>([]);
  const [all, setAll] = useState<RelatedInfoType[]>([]);
  const [friends, setFriends] = useState<RelatedInfoType[]>([]);
  const [addressees, setAddressees] = useState<RelatedInfoType[]>([]);
  const [requesters, setRequesters] = useState<RelatedInfoType[]>([]);
  const [blocks, setBlocks] = useState<RelatedInfoType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { id } = useUserState();
  const params = useParams();
  const {
    isOpen, setOpen, dialog, setDialog,
  } = useDialog();

  useEffect(() => {
    setLoading(true);
    asyncGetRequest(makeAPIPath('/users'))
      .then(({ data }: { data: RawUserInfoType[] }) => {
        const typed: UserInfoType[] = data;
        setAll(typed.filter((oneUser) => oneUser.id !== id)
          .map((oneUser) => ({ ...oneUser, avatar: makeAPIPath(`/${oneUser.avatar}`), relationship: 'NONE' })));
        return (asyncGetRequest(makeAPIPath('/friends')));
      })
      .then(({ data }: { data: RawUserInfoType[] }) => {
        const typed: UserInfoType[] = data;
        setFriends(typed.filter((oneUser) => oneUser.id !== id)
          .map((oneUser) => ({ ...oneUser, avatar: makeAPIPath(`/${oneUser.avatar}`), relationship: 'FRIEND' })));
        return (asyncGetRequest(makeAPIPath('/friends?status=REQUESTED&me=REQUESTER')));
      })
      .then(({ data }: { data: RawUserInfoType[] }) => {
        const typed: UserInfoType[] = data;
        setAddressees(typed.filter((oneUser) => oneUser.id !== id)
          .map((oneUser) => ({ ...oneUser, avatar: makeAPIPath(`/${oneUser.avatar}`), relationship: 'REQUESTING' })));
        return (asyncGetRequest(makeAPIPath('/friends?status=REQUESTED&me=ADDRESSEE')));
      })
      .then(({ data }: { data: RawUserInfoType[] }) => {
        const typed: UserInfoType[] = data;
        setRequesters(typed.filter((oneUser) => oneUser.id !== id)
          .map((oneUser) => ({ ...oneUser, avatar: makeAPIPath(`/${oneUser.avatar}`), relationship: 'REQUESTED' })));
        return (
          asyncGetRequest(makeAPIPath('/blocks'))
            .finally(() => setLoading(false))
            .then((response) => {
              const innerTyped: UserInfoType[] = response.data;
              setBlocks(innerTyped.map((block) => ({ ...block, avatar: makeAPIPath(`/${block.avatar}`), relationship: 'BLOCKING' })));
            })
        );
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  }, [params]);
  // TODO: 효율 검증 필요할 듯 합니다

  useEffect(() => {
    setAllFriends([...addressees, ...requesters, ...friends]);
  }, [friends, addressees, requesters]);

  useEffect(() => {
    const tempUsers = [...addressees, ...requesters, ...friends, ...blocks];
    setAllUsers(all.map((one) => {
      const user = tempUsers.filter((oneUser) => oneUser.id === one.id);
      return user.length ? user[0] : one;
    }));
  }, [all, friends, addressees, requesters, blocks]);

  const UserList = ({ users }: ListProps) => (
    <>
      {(isLoading ? (
        <>
          <ListItem><ProfileCardSkeleton /></ListItem>
          <ListItem><ProfileCardSkeleton /></ListItem>
          <ListItem><ProfileCardSkeleton /></ListItem>
          <ListItem><ProfileCardSkeleton /></ListItem>
          <ListItem><ProfileCardSkeleton /></ListItem>
        </>
      ) : (
        users.map((user) => (
          <ListItem key={user.id}>
            <ProfileCard
              userInfo={user}
              setUser={(userInfo) => {
                setAllUsers(allUsers.filter((one) => one.id !== userInfo.id).concat(userInfo));
              }}
              setOpen={setOpen}
              setDialog={setDialog}
            />
          </ListItem>
        ))
      ))}
    </>
  );

  return (
    <>
      <Dialog
        isOpen={isOpen}
        title={dialog.title}
        content={dialog.content}
        buttons={dialog.buttons}
        onClose={dialog.onClose}
      />
      <SubMenu current={window.location.pathname} list={list} />
      <List height="78vh" scroll>
        <Switch>
          <Route exact path={FRIEND_PATH} render={() => <UserList users={allFriends} />} />
          <Route exact path={BLOCKED_PATH} render={() => <UserList users={blocks} />} />
          <Route exact path={ALL_PATH} render={() => <UserList users={allUsers} />} />
          <Route path="/">
            <Redirect to={FRIEND_PATH} />
          </Route>
        </Switch>
      </List>
    </>
  );
};

export default CommunityPage;
