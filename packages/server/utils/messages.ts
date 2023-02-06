import moment from 'moment'
import { User } from './users'

export const MAX_MESSAGES = 10

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
  Pong = 'pong',
}

export enum SocketMessages {
  ChatMessage = 'chatMessage',
  Connection = 'connection',
  Disconnect = 'disconnect',
  JoinRoom = 'joinRoom',
  Ping = 'ping',
}

export interface RoomUsersEvent {
  room: string
  users: User[]
}
