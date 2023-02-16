import { User } from '@chatapp/server/utils/users'
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react'
import { Message, RoomUsersEvent } from '@chatapp/server/utils/messages'
import { Socket } from 'socket.io-client'

interface ServerToClientEvents {
  pong: () => void
  message: (msg: Message) => void
  roomUsers: (data: RoomUsersEvent) => void
}

interface ClientToServerEvents {
  disconnect: () => void
  joinRoom: (data: any) => void
}

export const ChatAppContext = createContext<Partial<ChatAppDetails>>({})

export const ChatAppProvider = ({ children }: ChatAppProviderProps) => {
  const [room, setRoom] = useState<string | undefined>()
  const [userName, setUserName] = useState<string | undefined>()
  const [users, setUsers] = useState<User[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [socket, setSocket] = useState<
    Socket<ServerToClientEvents, ClientToServerEvents> | undefined
  >()

  const value = useMemo(
    () => ({
      room,
      setRoom,
      userName,
      setUserName,
      users,
      setUsers,
      messages,
      setMessages,
      socket,
      setSocket,
    }),
    [room, userName, users]
  )

  return (
    <ChatAppContext.Provider value={value}>{children}</ChatAppContext.Provider>
  )
}

export interface ChatAppDetails {
  userName?: string
  setUserName: Dispatch<SetStateAction<string | undefined>>
  room?: string
  setRoom: Dispatch<SetStateAction<string | undefined>>
  users?: User[]
  setUsers: Dispatch<SetStateAction<User[]>>
  messages?: Message[]
  setMessages: Dispatch<SetStateAction<Message[]>>
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>
  setSocket: Dispatch<
    SetStateAction<
      Socket<ServerToClientEvents, ClientToServerEvents> | undefined
    >
  >
}

export interface ChatAppProviderProps {
  children: ReactNode
}
