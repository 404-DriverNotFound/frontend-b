import { MessageType, RawDMType, RawMessageType } from '../types/Chat';
import { makeAPIPath } from './utils';

const messageToMessage = (message: RawMessageType, channelName?: string): MessageType => {
  const {
    content, user, id, createdAt,
  } = message;
  return ({
    content,
    user: { ...user, avatar: makeAPIPath(`/${user.avatar}`) },
    id,
    createdAt: new Date(createdAt),
    name: channelName || message.channel.name,
  });
};

const DMToMessage = (message: RawDMType, myName: string): MessageType => {
  const {
    content, id, createdAt, receiver, sender,
  } = message;
  return ({
    content,
    user: { ...sender, avatar: makeAPIPath(`/${sender.avatar}`) },
    id,
    createdAt: new Date(createdAt),
    name: receiver.name === myName ? sender.name : receiver.name,
  });
};

export { messageToMessage, DMToMessage };
