import { Board, Mark, Status } from '@/models';
import { create } from 'zustand';

enum MessageType {
  GameStarted = 'gameStarted',
  PlayerTurn = 'playerTurn',
  Notification = 'notification',
  GameEnded = 'gameEnded',
}

type BasicMessageData = {
  game: {
    board: Board;
    player1: { mark: Mark };
    player2: { mark: Mark };
    current: { mark: Mark };
    winner: Mark | 'draw' | null;
    status: Status;
  };
};

type MessageGameStarted = {
  type: MessageType.GameStarted;
  data: BasicMessageData & { mark: Mark };
};

type MessagePlayerTurn = {
  type: MessageType.PlayerTurn;
  data: BasicMessageData;
};

type MessageNotification = {
  type: MessageType.Notification;
  data: BasicMessageData & { message: string };
};

type MessageGameEnded = {
  type: MessageType.GameEnded;
  data: BasicMessageData;
};

type Message =
  | MessageGameStarted
  | MessagePlayerTurn
  | MessageNotification
  | MessageGameEnded;

interface WebSocketState {
  socket: WebSocket | null;
  game: {
    board: Board | null;
    status: Status | null;
    current: { mark: string } | null;
    winner: Mark | 'draw' | null;
    player1: { mark: Mark } | null;
    player2: { mark: Mark } | null;
  } | null;
  myMark: Mark | null;
  sendMessage: (message: string) => void;
  connect: () => void;
  disconnect: () => void;
  makeMove: (move: { row: number; col: number }) => void;
}

const handleMessage = (event: MessageEvent<unknown>) => {
  if (typeof event.data !== 'string') return;
  const message: Message = JSON.parse(event.data);
  switch (message.type) {
    case MessageType.GameStarted:
      useGameStocket.setState({
        game: message.data.game,
        myMark: message.data.mark,
      });
      break;
    case MessageType.PlayerTurn:
      useGameStocket.setState({
        game: message.data.game,
      });
      break;
    case MessageType.Notification:
      useGameStocket.setState({
        game: message.data.game,
      });
      break;
    case MessageType.GameEnded:
      useGameStocket.setState({
        game: message.data.game,
      });
      console.log('playerWon', message.data);
      break;
    default:
      console.warn('Unknown message type', message);
      break;
  }
};

const useGameStocket = create<WebSocketState>((set, get) => ({
  socket: null,
  game: {
    status: null,
    board: null,
    current: null,
    winner: null,
    player1: null,
    player2: null,
  },
  myMark: null,
  connect: () => {
    const socket = new WebSocket(import.meta.env.VITE_WS_URL);
    socket.onopen = () => {
      set({ socket });
    };
    socket.onmessage = handleMessage;
    socket.onclose = () => {
      set({ socket: null, game: null, myMark: null });
    };
  },
  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
    }
  },
  sendMessage: (message: string) => {
    const socket = get().socket;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  },
  makeMove: ({ row, col }: { row: number; col: number }) => {
    get().sendMessage(JSON.stringify({ type: 'move', data: { row, col } }));
  },
}));

export default useGameStocket;
