import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch, useUserState } from '../../../utils/hooks/useContext';
import { FriendshipType, RelatedInfoType } from '../../../types/User';
import Button from '../../atoms/Button/Button';
import UserProfile from '../../molecules/UserProfile/UserProfile';
import { DialogProps } from '../../../utils/hooks/useDialog';
import UserInfoForm from '../UserInfoForm/UserInfoForm';
import { makeAPIPath } from '../../../utils/utils';
import { makeRelationship } from '../../../utils/friendship';

const useStyles = makeStyles({
  root: {
    padding: '0.5em',
    width: '100%',
    height: '100px',
  },
  button: {
    width: '6.5em',
  },
});

type ProfileCardProps = {
  userInfo: RelatedInfoType,
  // eslint-disable-next-line no-unused-vars
  setUser: (value: RelatedInfoType) => void,
  // eslint-disable-next-line no-unused-vars
  setOpen: (value: boolean) => void,
  // eslint-disable-next-line no-unused-vars
  setDialog: (value: DialogProps) => void,
  profile?: boolean,
};

type ButtonObjType = {
  text: string,
  onClick: React.MouseEventHandler,
};

const ProfileCard = ({
  userInfo, setUser, setOpen, setDialog, profile,
}: ProfileCardProps) => {
  const {
    id, name, relationship, relationshipId,
  } = userInfo;
  const me = useUserState();
  const appDispatch = useAppDispatch();
  const history = useHistory();
  const classes = useStyles();

  const myButton: ButtonObjType = {
    text: '정보 수정',
    onClick: () => {
      const content = (
        <UserInfoForm
          currentName={me.name}
          currentAvatarSrc={me.avatar}
          current2FA={me.enable2FA!}
          setOpen={setOpen}
          setDialog={setDialog}
        />
      );
      setDialog({
        title: 'Edit Profile',
        content,
        onClose: () => { setOpen(false); },
      });
      setOpen(true);
    },
  };

  const handleAddFriend = () => {
    appDispatch({ type: 'loading' });
    axios.post(makeAPIPath('/friendship'), {
      addresseeName: me.name,
    })
      .finally(() => {
        appDispatch({ type: 'endLoading' });
      })
      .then((response) => {
        setUser({
          ...userInfo,
          relationship: 'REQUESTING',
          relationshipId: response.data.id,
        });
        toast('친구 요청을 보냈습니다.');
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setOpen(false);
  };

  const handlePatchRequest = (
    status: FriendshipType,
    comment: string,
  ) => {
    appDispatch({ type: 'loading' });
    axios.patch(makeAPIPath(`/friendship/${relationshipId}/status`), {
      status,
    })
      .finally(() => {
        appDispatch({ type: 'endLoading' });
      })
      .then(({ data }) => {
        setUser({
          ...userInfo,
          status: data ? data.addressee.status : userInfo.status,
          relationship: makeRelationship(true, status),
          relationshipId: data ? data.id : undefined,
          // NOTE: API 구현 후, 의도대로 동작하는 지 확인
        });
        toast(comment);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setOpen(false);
  };

  const friendButton: ButtonObjType | null = (() => {
    switch (relationship) {
      case 'NONE':
      case 'BLOCKED':
        return {
          text: '친구 요청',
          onClick: () => {
            setDialog({
              title: '친구 요청 확인',
              content: `${name}님에게 친구 요청을 보내시겠습니까?`,
              buttons: (
                <>
                  <Button variant="text" onClick={() => { setOpen(false); }}>cancel</Button>
                  <Button type="button" onClick={handleAddFriend}>confirm</Button>
                </>),
              onClose: () => { setOpen(false); },
            });
            setOpen(true);
          },
        };
      case 'FRIEND':
        return {
          text: '친구 삭제',
          onClick: () => {
            setDialog({
              title: '친구 삭제 확인',
              content: `${name}님을 친구에서 삭제하시겠습니까?`,
              buttons: (
                <>
                  <Button variant="text" onClick={() => { setOpen(false); }}>cancel</Button>
                  <Button
                    type="button"
                    onClick={
                      () => handlePatchRequest('DECLINE', '친구를 삭제했습니다.')
                    }
                  >
                    confirm
                  </Button>
                </>),
              onClose: () => { setOpen(false); },
            });
            setOpen(true);
          },
        };
      case 'REQUESTING':
        return {
          text: '친구 요청 취소',
          onClick: () => {
            setDialog({
              title: '친구 요청 취소',
              content: `${name}님에게 보낸 친구 추가 요청을 취소하시겠습니까?`,
              buttons: (
                <>
                  <Button variant="text" onClick={() => { setOpen(false); }}>cancel</Button>
                  <Button
                    type="button"
                    onClick={
                      () => handlePatchRequest('DECLINE', '친구를 삭제했습니다.')
                    }
                  >
                    confirm
                  </Button>
                </>),
              onClose: () => { setOpen(false); },
            });
            setOpen(true);
          },
        };
      case 'REQUESTED':
        return {
          text: '친구 요청 수락',
          onClick: () => {
            setDialog({
              title: '친구 요청 수락',
              content: `${name}님의 친구 요청을 수락하시겠습니까?`,
              buttons: (
                <>
                  <Button variant="text" onClick={() => { setOpen(false); }}>cancel</Button>
                  <Button
                    type="button"
                    onClick={
                      () => handlePatchRequest('ACCEPT', '친구 요청을 수락했습니다.')
                    }
                  >
                    confirm
                  </Button>
                </>),
              onClose: () => { setOpen(false); },
            });
            setOpen(true);
          },
        };
      case 'BLOCKING':
      default:
        return null;
    }
  })();

  const blockButton: ButtonObjType = (() => {
    switch (relationship) {
      case 'BLOCKING':
        return {
          text: '차단 취소',
          onClick: () => {
            setDialog({
              title: '차단 취소',
              content: `${name}님을 차단 해제 하시겠습니까?`,
              buttons: (
                <>
                  <Button variant="text" onClick={() => { setOpen(false); }}>cancel</Button>
                  <Button
                    type="button"
                    onClick={
                      () => handlePatchRequest('DECLINE', '차단 해제했습니다.')
                    }
                  // NOTE: API 구현 후, 의도대로 동작하는 지 확인
                  >
                    confirm
                  </Button>
                </>),
              onClose: () => { setOpen(false); },
            });
            setOpen(true);
          },
        };
      default:
        return {
          text: '유저 차단',
          onClick: () => {
            setDialog({
              title: '유저 차단',
              content: `${name}님을 차단하시겠습니까?`,
              buttons: (
                <>
                  <Button variant="text" onClick={() => { setOpen(false); }}>cancel</Button>
                  <Button
                    type="button"
                    onClick={
                      () => handlePatchRequest('BLOCK', '해당 유저를 차단했습니다.')
                    }
                    // NOTE: API 구현 후, 의도대로 동작하는 지 확인
                  >
                    confirm
                  </Button>
                </>),
              onClose: () => { setOpen(false); },
            });
            setOpen(true);
          },
        };
    }
  })();

  const otherButtons: ButtonObjType[] = (() => {
    const array = [
      {
        text: 'DM',
        onClick: () => {
          // TODO: API 구현 후, 추가
        },
      },
      {
        text: '매치 초대',
        onClick: () => {
          // TODO: API 구현 후, 추가
        },
      },
    ];
    if (profile) return array;
    return array.concat({
      text: '프로필',
      onClick: () => { history.push(`/profile/${name}`); },
    });
  })();

  const buttonArray = () => {
    const array: ButtonObjType[] = [];

    if (me.id === id) {
      array.push(myButton);
      return array;
    }
    if (friendButton) array.push(friendButton);
    if (profile) array.push(blockButton);
    return array.concat(otherButtons);
  };

  const Buttons = buttonArray().map((button) => (
    <Grid item key={button.text}>
      <Button
        className={['친구 요청 취소', '친구 요청 수락'].includes(button.text) ? '' : classes.button}
        variant={['친구 요청 취소', '친구 요청 수락'].includes(button.text) ? 'contained' : 'outlined'}
        onClick={button.onClick}
        key={button.text}
      >
        {button.text}
      </Button>
    </Grid>
  ));

  return (
    <Grid className={classes.root} item container justifyContent="space-around" alignItems="center">
      <UserProfile userInfo={userInfo} profile={profile} />
      <Grid item container justifyContent="flex-end" alignItems="center" xs={7}>
        {Buttons}
      </Grid>
    </Grid>
  );
};

ProfileCard.defaultProps = {
  profile: false,
};

export default ProfileCard;
