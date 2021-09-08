import React, {
  createContext, useReducer, useContext, Dispatch,
} from 'react';
import { Socket } from 'socket.io-client';
import { ChannelType, DMRoomType, MessageType } from '../../types/Chat';

type AppStateType = {
  isLoading: boolean,
  socket: Socket | null,
  chatting: string | null,
  channels: ChannelType[],
  dms: DMRoomType[],
  /**
   * 'message'나 'dm' 이벤트를 수신하면
   * 어떤 채널에 온 이벤트인지 확인해서
   * 그 채널의 unreads < 같은 변수 조작 해주면 되지 않을까?
   */
};

const initialAppState: AppStateType = {
  isLoading: false,
  socket: null,
  chatting: null,
  channels: [],
  dms: [],
};

type AppActionType =
  { type: 'loading' } |
  { type: 'endLoading' } |
  { type: 'connect', socket: Socket } |
  { type: 'join', channels: ChannelType[], dms: DMRoomType[] } |
  { type: 'enterRoom', name: string } |
  { type: 'newMessage', message: MessageType } |
  { type: 'disconnect' };

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
    case 'newMessage':
      return {
        ...state,
        channels: state.channels.map((channel: ChannelType) => {
          if (channel.name === action.message.channel.name) {
            return { ...channel, unreads: channel.unreads + 1 };
          } return { ...channel };
        }),
        // dms: state.dms.map((dmRoom: DMRoomType) => {
        //   if (dmRoom.name === action.message.name) {
        //     return { ...dmRoom, unreads: dmRoom.unreads + 1 };
        //   } return { ...dmRoom };
        // }), FIXME: DMType 만든 뒤 AppDispatch 수정할 것
      };
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
