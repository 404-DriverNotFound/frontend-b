export type UserStatusType = 'ONLINE' | 'OFFLINE' | 'IN_GAME';

export type RelationshipType = 'NONE' | 'FRIEND' | 'REQUESTING' | 'REQUESTED' | 'BLOCKING' | 'BLOCKED';

export type UserInfoType = {
  id: string,
  name: string,
  avatar: string,
  status: UserStatusType,
  relationship: RelationshipType,
};
