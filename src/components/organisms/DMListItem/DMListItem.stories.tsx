import React from 'react';
import { Meta } from '@storybook/react';
// import { BrowserRouter } from 'react-router-dom';
import DMListItem from './DMListItem';
import { MessageType, RawChannelType } from '../../../types/Chat';
// import List from '../../atoms/List/List';
// import MainTemplate from '../../templates/MainTemplate/MainTemplate';
// import { ContextProvider } from '../../../utils/hooks/useContext';

export default {
  title: 'organisms/DMListItem',
  component: DMListItem,
} as Meta;

export const Default = () => {
  const channel: RawChannelType = {
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
    name: 'temp',
    password: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const shortMessage: MessageType = {
    id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: new Date(),
    user: {
      id: '550e8400-e29b-41d4-a716-446655440000', // 의미없는 uuid입니다
      name: 'Jikang',
      avatar: '',
      status: 'ONLINE',
    },
    channel,
  };
  return (
    <DMListItem
      info={shortMessage}
      setOpen={() => {}}
      setDialog={() => {}}
    />
  );
};

// export const WithList = () => {
//   const channelInfo1: ChannelType = {
//     name: '내가 만든 공개방',
//     role: 'OWNER',
//     unreads: 10,
//     isLocked: false,
//     updatedAt: new Date(),
//   };

//   const channelInfo2: ChannelType = {
//     name: '내가 ADMIN인 공개방',
//     role: 'ADMIN',
//     unreads: 5,
//     isLocked: false,
//     updatedAt: new Date(),
//   };

//   const channelInfo3: ChannelType = {
//     name: '내가 만든 비공개방',
//     role: 'OWNER',
//     unreads: 42,
//     isLocked: true,
//     updatedAt: new Date(),
//   };

//   const channelInfo4: ChannelType = {
//     name: '내가 ADMIN인 비공개방',
//     role: 'ADMIN',
//     unreads: 2,
//     isLocked: true,
//     updatedAt: new Date(),
//   };

//   const channelInfo5: ChannelType = {
//     name: '내가 멤버인 공개방',
//     role: 'MEMBER',
//     unreads: 0,
//     isLocked: false,
//     updatedAt: new Date(),
//   };

//   const channelInfo6: ChannelType = {
//     name: '내가 멤버인 비공개방',
//     role: 'MEMBER',
//     unreads: 10,
//     isLocked: true,
//     updatedAt: new Date(),
//   };

//   const channelInfo7: ChannelType = {
//     name: '아직 join이 안된 공개방',
//     role: 'NONE',
//     unreads: 0,
//     isLocked: false,
//     updatedAt: new Date(),
//   };

//   const channelInfo8: ChannelType = {
//     name: '아직 join이 안된 비공개방',
//     role: 'NONE',
//     unreads: 0,
//     isLocked: true,
//     updatedAt: new Date(),
//   };

//   return (
//     <List scroll height="70vh">
//       <DMListItem
//         info={channelInfo1}
//         setOpen={() => {}}
//         setDialog={() => {}}
//       />
//       <DMListItem
//         info={channelInfo2}
//         setOpen={() => {}}
//         setDialog={() => {}}
//       />
//       <DMListItem
//         info={channelInfo3}
//         setOpen={() => {}}
//         setDialog={() => {}}
//       />
//       <DMListItem
//         info={channelInfo4}
//         setOpen={() => {}}
//         setDialog={() => {}}
//       />
//       <DMListItem
//         info={channelInfo5}
//         setOpen={() => {}}
//         setDialog={() => {}}
//       />
//       <DMListItem
//         info={channelInfo6}
//         setOpen={() => {}}
//         setDialog={() => {}}
//       />
//       <DMListItem
//         info={channelInfo7}
//         setOpen={() => {}}
//         setDialog={() => {}}
//       />
//       <DMListItem
//         info={channelInfo8}
//         setOpen={() => {}}
//         setDialog={() => {}}
//       />
//     </List>
//   );
// };

// export const WithTemplate = () => (

//   <BrowserRouter>
//     <ContextProvider>
//       <MainTemplate
//         main={<WithList />}
//         chat={<h1>Chat</h1>}
//       />
//     </ContextProvider>
//   </BrowserRouter>
// );
