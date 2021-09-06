import React, {
  createContext, useReducer, useContext, Dispatch,
} from 'react';
import { Socket } from 'socket.io-client';

type AppStateType = {
  isLoading: boolean,
  socket: Socket | null,
  // channels: ,
  // dms: ,
};

const initialAppState: AppStateType = {
  isLoading: false,
  socket: null,
};

type AppActionType =
  { type: 'loading' } |
  { type: 'endLoading' } |
  { type: 'connect', socket: Socket } |
  { type: 'disconnect' };
  // { type: 'join', channel이나 dm 목록 갱신 };

const AppStateContext = createContext<AppStateType | undefined>(undefined);
const AppDispatchContext = createContext<Dispatch<AppActionType> | undefined>(undefined);

function AppReducer(state: AppStateType, action: AppActionType): AppStateType {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'endLoading':
      return { ...state, isLoading: false };
    case 'connect':
      return { ...state, socket: action.socket };
    case 'disconnect':
      return { ...state, socket: null };
    default:
      return { ...state };
  }
}

function useAppState() {
  const state = useContext(AppStateContext);
  if (!state) {
    throw new Error('Provider not found');
  }
  return (state);
}

function useAppDispatch() {
  const dispatch = useContext(AppDispatchContext);
  if (!dispatch) {
    throw new Error('Provider not found');
  }
  return (dispatch);
}

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [appState, appDispatch] = useReducer(AppReducer, initialAppState);
  return (
    <AppStateContext.Provider value={appState}>
      <AppDispatchContext.Provider value={appDispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export {
  AppContextProvider, useAppDispatch, useAppState,
};
