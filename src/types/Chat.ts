import { RawUserInfoType } from './Response';
import { UserInfoType } from './User';

export type MembershipRole = 'ADMIN' | 'OWNER' | 'MEMBER' | 'NONE';

type MembershipType = {
  role: MembershipRole,
  createdAt: Date,
};

export type RawChannelType = {
  id: string,
  name: string,
  password: 'HIDDEN' | null,
  createdAt: string,
  updatedAt: string,
  memberships: MembershipType[],
};

export type RawMessageType = {
  content: string,
  user: UserInfoType,
  channel: RawChannelType,
  id: string, // message의 id
  createdAt: Date,
};

export type RawDMType = {
  content: string,
  receiver: RawUserInfoType,
  sender: RawUserInfoType,
  id: string, // message의 id
  createdAt: Date,
};

export type MessageType = {
  type: 'channel' | 'DM',
  content: string,
  user: UserInfoType,
  name: string,
  id: string, // message의 id
  createdAt: Date,
};

export type ChannelType = {
  name: string,
  role: MembershipRole,
  unreads: number,
  isLocked: boolean,
  updatedAt: Date,
};

export type DMRoomType = {
  name: string,
  latestMessage?: MessageType,
  unreads: number,
};
