import { User } from '@chatapp/server/utils/users'
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react'

export const ChatAppContext = createContext<Partial<ChatAppDetails>>({})

export const ChatAppProvider = ({ children }: ChatAppProviderProps) => {
  const [room, setRoom] = useState<string | undefined>()
  const [userName, setUserName] = useState<string | undefined>()
  const [users, setUsers] = useState<User[]>([])

  const value = useMemo(
    () => ({ room, setRoom, userName, setUserName, users, setUsers }),
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
}

export interface ChatAppProviderProps {
  children: ReactNode
}
