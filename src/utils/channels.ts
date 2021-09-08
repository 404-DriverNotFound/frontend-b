import { ChannelType, RawChannelType } from '../types/Chat';

const makeChannelInfo = (rawData: RawChannelType): ChannelType => {
  const {
    name, password, updatedAt, memberships,
  } = rawData;
  return {
    name,
    updatedAt: new Date(updatedAt),
    unreads: 0,
    isLocked: password !== null,
    role: memberships[0] ? memberships[0].role : 'NONE',
  };
};

export default makeChannelInfo;
