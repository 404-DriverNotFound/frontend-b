import { RawUserInfoType } from './Response';

export type MatchStatusType = 'IN_PROGRESS' | 'DONE';

export type MatchGameType = 'LADDER' | 'EXHIBITON';

export type GameModeType = 'CLASSIC' | 'SPEED' | 'REVERSE';

export type RawMatchType = {
  id: string,
  createdAt: string,
  status: MatchStatusType,
  type: MatchGameType,
  gameMode: GameModeType, // FIXME: API 수정 후 적용하기
  user1: RawUserInfoType & { score: number },
  user2: RawUserInfoType & { score: number },
};

export type MatchType = {
  id: string,
  status: MatchStatusType, // FIXME: IN_PROGRESS만 받는 지 확인 후 삭제
  type: MatchGameType,
  gameMode: GameModeType, // FIXME: API 수정 후 적용하기
  user1: RawUserInfoType & { score: number },
  user2: RawUserInfoType & { score: number },
}
