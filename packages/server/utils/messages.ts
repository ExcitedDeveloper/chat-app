import moment from 'moment'

export interface Message {
  userName: string
  text: string
  time: string
}

export const formatMessage = (userName: string, text: string): Message => {
  return {
    userName,
    text,
    time: moment().format('h:mm a'),
  }
}

export enum EmitMessages {
  Message = 'message',
  RoomUsers = 'roomUsers',
}

export enum SocketMessages {
  ChatMessage = 'chatMessage',
  Connection = 'connection',
  Disconnect = 'disconnect',
  JoinRoom = 'joinRoom',
}
