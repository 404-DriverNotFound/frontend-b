import { UserInfoType } from './User';

export type MatchType = {
  id: string,
  createdAt: Date,
  status: 'IN_PROGRESS' | 'DONE',
  type: 'EXHIBITION' | 'LADDER',
  user1: UserInfoType,
  user2: UserInfoType,
  winner: string | null,
  loser: string | null,
};
