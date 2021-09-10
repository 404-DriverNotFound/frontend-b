import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';
import { asyncGetRequest, errorMessageHandler, makeAPIPath } from '../../../utils/utils';
import List from '../../atoms/List/List';
import Button from '../../atoms/Button/Button';
import Dialog from '../../molecules/Dialog/Dialog';
import useDialog from '../../../utils/hooks/useDialog';
import useIntersect from '../../../utils/hooks/useIntersect';
import { MemberType } from '../../../types/Chat';
import ListItem from '../../atoms/ListItem/ListItem';
import Typo from '../../atoms/Typo/Typo';
import { useAppDispatch } from '../../../utils/hooks/useAppContext';
import { useUserState } from '../../../utils/hooks/useUserContext';
import ChannelInfoForm from '../../organisms/ChannelInfoForm/ChannelInfoForm';

const COUNTS_PER_PAGE = 10;

type MatchParams = {
  channelName: string,
};

const ChannelManagePage = ({ match }: RouteComponentProps<MatchParams>) => {
  const { CancelToken } = axios;
  const source = CancelToken.source();
  const [canManage, setManage] = useState<boolean>(false);
  const [users, setUsers] = useState<MemberType[]>([]);
  const [isListEnd, setListEnd] = useState(true);
  const [page, setPage] = useState<number>(0);
  const { channelName } = match.params;
  const path = makeAPIPath(`/channels/${channelName}/members`);
  const {
    // eslint-disable-next-line no-unused-vars
    isOpen, setOpen, dialog, setDialog,
  } = useDialog();
  const history = useHistory();
  const userState = useUserState();
  const appDispatch = useAppDispatch();

  const handleChangePassword = () => {
    setDialog({
      title: 'Channel Edit',
      content: <ChannelInfoForm setOpen={setOpen} channel={channelName} />,
      onClose: () => { setOpen(false); },
    });
    setOpen(true);
  };

  const fetchItems = () => {
    if (isListEnd) return;

    asyncGetRequest(`${path}?perPage=${COUNTS_PER_PAGE}&page=${page}`, source)
      .then(({ data }) => {
        setUsers((prev) => prev.concat(data));
        if (data.length === 0 || data.length < COUNTS_PER_PAGE) setListEnd(true);
      })
      .catch((error) => {
        source.cancel();
        errorMessageHandler(error);
        setListEnd(true);
      });
  };

  useEffect(() => {
    fetchItems();
  }, [page]);

  // eslint-disable-next-line no-unused-vars
  const [_, setRef] = useIntersect(async (entry: any, observer: any) => {
    observer.unobserve(entry.target);
    await new Promise((resolve) => setTimeout(resolve, 250));
    setPage((prev) => prev + 1);
    observer.observe(entry.target);
  });

  useEffect(() => {
    appDispatch({ type: 'loading' });
    asyncGetRequest(makeAPIPath(`/channels/${channelName}/members`))
      .finally(() => { appDispatch({ type: 'endLoading' }); })
      .then(({ data }) => {
        if (data.some((member: MemberType) => (
          member.name === userState.name && ['ADMIN', 'OWNER'].includes(member.memberships[0].role)))) {
          setManage(true);
          setListEnd(false);
        } else {
          toast.error('접근 권한이 없습니다.');
          history.goBack();
        }
      })
      .catch((error) => {
        errorMessageHandler(error);
        history.goBack();
      });

    return () => {
      source.cancel();
      setUsers([]);
      setListEnd(true);
    };
  }, []);

  return (canManage ? (
    <>
      <Dialog
        isOpen={isOpen}
        title={dialog.title}
        content={dialog.content}
        buttons={dialog.buttons}
        onClose={dialog.onClose}
      />
      <Grid container justifyContent="space-between" alignItems="center">
        <Typo variant="h6">{channelName}</Typo>
        <Button variant="outlined" onClick={handleChangePassword}>채널 정보 변경</Button>
      </Grid>
      <List height="78vh" scroll>
        {users.map((user: MemberType) => (
          // FIXME DMListItem으로 교체
          <ListItem key={user.id}>{user.name}</ListItem>
        ))}
        {!isListEnd && (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}
          ref={isListEnd ? null : setRef as React.LegacyRef<HTMLDivElement>}
        >
          <Grid
            item
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            wrap="nowrap"
            spacing={1}
            xs={12}
            // FIXME 스켈레톤 넣기
          >
            <ListItem>skeleton here</ListItem>
            <ListItem>skeleton here</ListItem>
            <ListItem>skeleton here</ListItem>
          </Grid>
        </div>
        )}
      </List>
    </>
  ) : <></>);
};

export default ChannelManagePage;
