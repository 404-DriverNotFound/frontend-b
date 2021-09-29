import React, {
  createContext, Dispatch, useContext, useReducer,
} from 'react';
import { GameModeType, MatchPositionType } from '../../types/Match';
import { RawUserInfoType } from '../../types/Response';
import { UserInfoType } from '../../types/User';

type GameStateType = {
  mode: GameModeType | null,
  setting: any | null,
  player0: UserInfoType | null,
  player1: UserInfoType | null,
  position: MatchPositionType | null,
};

const initialGameState: GameStateType = {
  mode: null,
  setting: null,
  player0: null,
  player1: null,
  position: null,
};

type GameActionType =
  { type: 'setMode', mode: GameModeType | null } |
  { type: 'ready', position: MatchPositionType, player0: RawUserInfoType, player1: RawUserInfoType, setting: any } |
  { type: 'reset' };

const GameStateContext = createContext<GameStateType | undefined>(undefined);
const GameDispatchContext = createContext<Dispatch<GameActionType> | undefined>(undefined);

function GameReducer(state: GameStateType, action: GameActionType): GameStateType {
  switch (action.type) {
    case 'setMode':
      return { ...state, mode: action.mode };
    case 'ready':
      // eslint-disable-next-line no-case-declarations
      const {
        position, player0, player1, setting,
      } = action;
      return {
        ...state, position, player0, player1, setting,
      };
    case 'reset':
      return { ...initialGameState };
    default:
      return { ...state };
  }
}

function useGameState() {
  const state = useContext(GameStateContext);
  if (!state) {
    throw new Error('Provider not found');
  }
  return (state);
}

function useGameDispatch() {
  const dispatch = useContext(GameDispatchContext);
  if (!dispatch) {
    throw new Error('Provider not found');
  }
  return (dispatch);
}

function GameContextProvider({ children }: { children: React.ReactNode }) {
  const [appState, appDispatch] = useReducer(GameReducer, initialGameState);
  return (
    <GameStateContext.Provider value={appState}>
      <GameDispatchContext.Provider value={appDispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

export {
  GameContextProvider, useGameDispatch, useGameState,
};
