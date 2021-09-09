import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';
import { useAppDispatch, useAppState } from '../../../utils/hooks/useAppContext';
import { asyncGetRequest, makeAPIPath } from '../../../utils/utils';
import ChatInput from '../../atoms/ChatInput/ChatInput';
import List from '../../atoms/List/List';
import Typo from '../../atoms/Typo/Typo';
import {
  ChannelType, MessageType, RawDMType, RawMessageType,
} from '../../../types/Chat';
import { useUserState } from '../../../utils/hooks/useUserContext';
import Dialog from '../../molecules/Dialog/Dialog';
import useDialog from '../../../utils/hooks/useDialog';
import ChatMessage from '../../organisms/ChatMessage/ChatMessage';
import useIntersect from '../../../utils/hooks/useIntersect';
import { DMToMessage, messageToMessage } from '../../../utils/chats';
import Button from '../../atoms/Button/Button';

const COUNTS_PER_PAGE = 20;

const postChannelChat = (name: string, content: string) => (axios.post(makeAPIPath(`/channels/${name}/chats`), { content }));
const postDM = (name: string, content: string) => (axios.post(makeAPIPath('/dms'), { name, content }));

const addNewChat = (prev: MessageType[], message: MessageType) => {
  const temp = prev.slice();
  temp.unshift(message);
  return temp;
};

const ChatPage = () => {
  const { CancelToken } = axios;
  const source = CancelToken.source();
  const userState = useUserState();
  const [chats, setChats] = useState<MessageType[]>([]);
  const [chat, setChat] = useState<string>('');
  const [isChatEnd, setChatEnd] = useState(false);
  const [page, setPage] = useState<number>(0);
  const { chatting, channels, newMessage } = useAppState();
  const appDispatch = useAppDispatch();
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const {
    isOpen, setOpen, dialog, setDialog,
  } = useDialog();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChat(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chat.length === 0) return;

    (channel ? postChannelChat(chatting!.name, chat) : postDM(chatting!.name, chat))
      .then(() => {
        setChat('');
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else toast.error(error.message);
      });
  };

  const fetchItems = () => {
    if (!chatting || isChatEnd) return;
    const path = chatting.type === 'channel' ? makeAPIPath(`/channels/${chatting.name}/chats`) : makeAPIPath(`/dms/opposite/${chatting.name}`);

    asyncGetRequest(`${path}?perPage=${COUNTS_PER_PAGE}&page=${page}`, source)
      .then(({ data }) => {
        const typed: MessageType[] = data
          .map((one: RawMessageType | RawDMType) => (
            chatting.type === 'channel' ? messageToMessage(one as RawMessageType, chatting!.name)
              : DMToMessage(one as RawDMType, userState.name)));
        setChats((prev) => prev.concat(typed));
        if (data.length === 0 || data.length < COUNTS_PER_PAGE) setChatEnd(true);
      })
      .catch((error) => {
        source.cancel();
        toast.error(error.message);
        setChatEnd(true);
      });
  };

  useEffect(() => {
    setChats([]);
    setChat('');
    setPage(chatting ? 1 : 0);
    setChannel((chatting && chatting.type === 'channel')
      ? (channels.filter((one) => one.name === chatting.name)[0] || null) : null);
    setChatEnd(!chatting);
  }, [chatting]);
  // FIXME listEnd false인데서 옮겨가면 0으로 요청보냄

  useEffect(() => {
    fetchItems();
  }, [page]);

  useEffect(() => {
    if (newMessage) {
      setChats((prev) => addNewChat(prev, newMessage));
    }
  }, [newMessage]);

  useEffect(() => () => {
    source.cancel();
    setChats([]);
    setChatEnd(true);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [_, setRef] = useIntersect(async (entry: any, observer: any) => {
    observer.unobserve(entry.target);
    await new Promise((resolve) => setTimeout(resolve, 250));
    setPage((prev) => prev + 1);
    observer.observe(entry.target);
  });

  return (
    <>
      <Dialog
        isOpen={isOpen}
        title={dialog.title}
        content={dialog.content}
        buttons={dialog.buttons}
        onClose={dialog.onClose}
      />
      <Grid container justifyContent="space-between" alignItems="center">
        <Typo variant="h6">{chatting?.name || '참여중인 채팅이 없습니다'}</Typo>
        <Button variant="text" onClick={() => appDispatch({ type: 'leaveRoom' })}>채팅 닫기</Button>
      </Grid>
      {chatting ? (
        <>
          <List height="70vh" reverse scroll>
            {chats.map((one) => (
              <ChatMessage
                key={one.id}
                info={one}
                userRole={channel ? channel.role : 'MEMBER'}
                me={one.user.name === userState.name}
                setOpen={setOpen}
                setDialog={setDialog}
              />
            ))}
            {!isChatEnd && (
            <div
              style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}
              ref={isChatEnd ? null : setRef as React.LegacyRef<HTMLDivElement>}
            >
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                wrap="nowrap"
                spacing={1}
                xs={12}
              >
                <Typo gutterBottom>Loading...</Typo>
              </Grid>
            </div>
            )}
          </List>
          <ChatInput value={chat} onChange={handleChange} onSubmit={handleSubmit} />
        </>
      )
        : (
          <List height="70vh">
            <Grid style={{ height: '100%' }} container item justifyContent="center" alignItems="center">
              <Typo>채팅에 참여해보세요!</Typo>
            </Grid>
          </List>
        )}
    </>
  );
};

export default ChatPage;