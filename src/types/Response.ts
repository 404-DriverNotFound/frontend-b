import { FriendshipType, UserStatusType } from './User';

/**
 * RawUserInfoType
 * @description API에서 얻을 수 있는 응답 형식
 * - id: user의 id
 * ### API Endpoint
 * - GET /users/me
 * - GET /users에서 friendship을 제외한 부분
 */
export type RawUserInfoType = {
  id: string,
  name: string,
  avatar: string,
  status: UserStatusType,
  enable2FA: boolean,
  authenticatorSecret: boolean,
  isSecondFactorAuthenticated: boolean,
};

/**
 * RawFriendInfoType
 * @description API에서 얻을 수 있는 응답 형식
 * - id: 관계 table의 id
 * ### API Endpoint
 * - GET /friendship
 * - GET /users에서 RawUserInfoType을 제외한 부분
 */
export type RawFriendInfoType = {
  id: string,
  status: FriendshipType,
  updatedAt: Date,
  requester: RawUserInfoType,
  addressee: RawUserInfoType,
};

/**
 * RawRelatedInfoType
 * @description API에서 받아온 raw한 user 정보 타입
 * - id: user의 id
 * - friendship.id: 관계 table의 id
 * ### API Endpoint
 * - GET /users
 */
export type RawRelatedInfoType = RawUserInfoType & {
  friendship: null | RawFriendInfoType,
};
