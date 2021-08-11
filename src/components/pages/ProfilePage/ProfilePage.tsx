import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';
import { RelationshipType, UserInfoType } from '../../../types/User';
import { useAppDispatch, useUserState } from '../../../utils/hooks/useContext';
import makeAPIPath from '../../../utils/utils';
import List from '../../atoms/List/List';
import Typo from '../../atoms/Typo/Typo';
import ProfileCard from '../../organisms/ProfileCard/ProfileCard';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import { asyncGetRequest } from '../../../utils/api/asyncRequest';
import Dialog from '../../molecules/Dialog/Dialog';
import useDialog from '../../../utils/hooks/useDialog';
import UserInfoForm from '../../organisms/UserInfoForm/UserInfoForm';

type MatchParams = {
  username: string,
};

const initalUserInfo: UserInfoType = {
  id: '',
  name: '',
  avatar: '',
  status: 'OFFLINE',
  enable2FA: false,
};

const ProfilePage = ({ match }: RouteComponentProps<MatchParams>) => {
  const [isValidUser, setValidUser] = useState<boolean>(true);
  const [user, setUser] = useState<UserInfoType>(initalUserInfo);
  const [relationship, setRelationship] = useState<RelationshipType>('none');
  const {
    isOpen, setOpen, dialog, setDialog,
  } = useDialog();
  const { username } = match.params;
  const appDispatch = useAppDispatch();
  const me = useUserState();

  useEffect(() => {
    appDispatch({ type: 'loading' });
    asyncGetRequest(makeAPIPath(`/users/${username}`))
      .then(({ data }) => {
        const {
          id, name, avatar, enable2FA, status,
        } = data;
        setUser({
          id,
          name,
          enable2FA: id === me.id ? enable2FA : false,
          avatar: makeAPIPath(`/${avatar}`),
          status,
        });
      })
      .catch((error) => {
        if (error.response && error.response.status >= 400 && error.response.status < 500) {
          setValidUser(false);
        } else {
          toast.error(error.message);
        }
      });
    if (me.id !== user.id) {
      // FIXME: Friendship API 수정 시 구현
      setRelationship('none');
      appDispatch({ type: 'endLoading' });
    } else {
      appDispatch({ type: 'endLoading' });
    }
  }, [username, me.avatar]);

  const handleProfileEdit = () => {
    const content = (
      <UserInfoForm
        currentName={user.name}
        currentAvatarSrc={user.avatar}
        current2FA={user.enable2FA!}
        setDialogOpen={setOpen}
      />
    );
    setDialog({
      title: 'Edit Profile',
      content,
      onClose: () => { setOpen(false); },
    });
    setOpen(true);
  };

  const handleFriendAdd = () => {
    // TODO: 추후 구현
  };

  const handleFriendRemove = () => {
    // TODO: 추후 구현
  };

  const handleUserBlock = () => {
    // TODO: 추후 구현
  };

  const handleUserUnblock = () => {
    // TODO: 추후 구현
  };

  const handleDMClick = () => {
    // TODO: 추후 구현
  };

  const handleMatchInvite = () => {
    // TODO: 추후 구현
  };

  const main = isValidUser ? (
    <Grid container direction="column" spacing={6} justifyContent="space-evenly" alignItems="stretch">
      <Grid item>
        <ProfileCard
          userInfo={user}
          relationship={relationship}
          onProfileEdit={handleProfileEdit}
          onFriendAdd={handleFriendAdd}
          onFriendRemove={handleFriendRemove}
          onUserBlock={handleUserBlock}
          onUserUnblock={handleUserUnblock}
          onDMClick={handleDMClick}
          onMatchInvite={handleMatchInvite}
        />
      </Grid>
      <Grid item>
        <Typo variant="h5">Match History</Typo>
        <List height="15em" />
      </Grid>
      <Grid item>
        <Typo variant="h5">Achievements</Typo>
        <List height="15em" />
      </Grid>
    </Grid>
  ) : (
    <Typo variant="h1">No such user</Typo>
  ); // FIXME: 유저 없을 때, UI 예쁘게 개선하기

  const chat = (
    <Typo variant="h1">Chat</Typo>
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
      <MainTemplate
        main={main}
        chat={chat}
      />
    </>
  );
};

export default ProfilePage;
