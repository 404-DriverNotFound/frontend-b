import React, {
  createContext, Dispatch, useContext, useReducer,
} from 'react';
import { GameModeType } from '../../types/Match';

type GameStateType = {
  mode: GameModeType | null,
  setting: any | null,
  position: 'LEFT' | 'RIGHT' | null,
};

const initialGameState: GameStateType = {
  mode: null,
  setting: null,
  position: null,
};

type GameActionType =
  { type: 'setMode', mode: GameModeType | null } |
  { type: 'ready', setting: any, position: 'LEFT' | 'RIGHT' } |
  { type: 'reset' };

const GameStateContext = createContext<GameStateType | undefined>(undefined);
const GameDispatchContext = createContext<Dispatch<GameActionType> | undefined>(undefined);

function GameReducer(state: GameStateType, action: GameActionType): GameStateType {
  switch (action.type) {
    case 'setMode':
      return { ...state, mode: action.mode };
    case 'ready':
      return { ...state, setting: action.setting, position: action.position };
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
