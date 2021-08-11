export type UserStatusType = 'ONLINE' | 'OFFLINE' | 'IN_GAME';

export type UserInfoType = {
  id: string,
  name: string,
  avatar: string,
  status: UserStatusType,
  enable2FA?: boolean,
};

export type RelationshipType = 'none' | 'friend' | 'block';
