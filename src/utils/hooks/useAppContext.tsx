import React, {
  createContext, useReducer, useContext, Dispatch,
} from 'react';
import { Socket } from 'socket.io-client';
import { ChannelType, DMRoomType, MessageType } from '../../types/Chat';

type ChattingType = {
  type: 'channel' | 'DM',
  name: string,
};

type AppStateType = {
  isLoading: boolean,
  socket: Socket | null,
  chatting: ChattingType | null,
  newMessage: MessageType | null,
  channels: ChannelType[],
  DMs: DMRoomType[],
};

const initialAppState: AppStateType = {
  isLoading: false,
  socket: null,
  chatting: null,
  newMessage: null,
  channels: [],
  DMs: [],
};

type AppActionType =
  { type: 'loading' } |
  { type: 'endLoading' } |
  { type: 'connect', socket: Socket } |
  { type: 'join', channels?: ChannelType[], DMs?: DMRoomType[] } |
  { type: 'exit', name: string } |
  { type: 'enterChat', chatting: ChattingType } |
  { type: 'leaveChat' } |
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
    case 'enterChat':
      return {
        ...state,
        chatting: action.chatting,
        channels: state.channels.map((channel: ChannelType) => {
          if (action.chatting.type === 'channel' && channel.name === action.chatting.name) {
            return { ...channel, unreads: 0 };
          } return { ...channel };
        }),
        DMs: state.DMs.map((dmRoom: DMRoomType) => {
          if (action.chatting.type === 'DM' && dmRoom.name === action.chatting.name) {
            return { ...dmRoom, unreads: 0 };
          } return { ...dmRoom };
        }),
      };
    case 'leaveChat':
      return { ...state, chatting: null };
    case 'join':
      return {
        ...state,
        channels: action.channels || state.channels,
        DMs: action.DMs || state.DMs,
      };
    case 'exit':
      return {
        ...state,
        chatting: state?.chatting?.name === action.name ? null : state.chatting,
        channels: state.channels.filter((one) => one.name !== action.name) || state.channels,
      };
    case 'newMessage':
      return {
        ...state,
        newMessage: (state.chatting?.type === action.message.type
          && action.message.name === state.chatting.name) ? action.message : null,
        channels: (action.message.type === 'channel'
          ? (state.channels.map((channel: ChannelType) => {
            if (channel.name === action.message.name && channel.name !== state.chatting?.name) {
              return { ...channel, unreads: channel.unreads + 1 };
            } return { ...channel };
          }))
          : state.channels),
        // eslint-disable-next-line no-nested-ternary
        DMs: (action.message.type === 'DM'
          ? (state.DMs.some((dmRoom) => dmRoom.name === action.message.name)
            ? state.DMs.map((dmRoom: DMRoomType) => {
              if (dmRoom.name === action.message.name && dmRoom.name !== state.chatting?.name) {
                return { ...dmRoom, unreads: dmRoom.unreads + 1, latestMessage: action.message };
              } return { ...dmRoom };
            }) : state.DMs.concat({
              name: action.message.name,
              latestMessage: action.message,
              unreads: action.message.user.name === action.message.name ? 1 : 0,
            })) : state.DMs), // FIXME 삼항연산자 떡칠인데 가독성 좋게 수정
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
