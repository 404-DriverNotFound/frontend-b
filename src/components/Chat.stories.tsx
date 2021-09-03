import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import MainTemplate from './templates/MainTemplate/MainTemplate';
import ListItem from './atoms/ListItem/ListItem';
import List from './atoms/List/List';
import ChatInput from './atoms/ChatInput/ChatInput';
import { ContextProvider } from '../utils/hooks/useContext';
import CommunityPage from './pages/CommunityPage/CommunityPage';

export default {
  component: MainTemplate,
  title: 'tests/Chat',
} as Meta;

const addNewChat = (prev: string[], newChat: string) => {
  const temp = prev.slice();
  temp.unshift(newChat);
  return temp;
};

const Chat = () => {
  const [chat, setChat] = useState<string[]>(['0']);
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <List height="75vh" scroll reverse>
        {chat.map((one) => <ListItem>{one}</ListItem>)}
      </List>
      <ChatInput
        onSubmit={(e) => {
          e.preventDefault();
          if (value === '') return;
          setChat((prev) => addNewChat(prev, value));
          setValue('');
        }}
        onChange={handleChange}
        value={value}
      />
    </>
  );
};

export const ChatTest = () => (
  <BrowserRouter>
    <ContextProvider>
      <MainTemplate
        main={<CommunityPage />}
        chat={<Chat />}
      />
    </ContextProvider>
  </BrowserRouter>
);
