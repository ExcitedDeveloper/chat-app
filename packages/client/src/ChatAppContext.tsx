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
  const [username, setUsername] = useState<string | undefined>()

  const value = useMemo(
    () => ({ room, setRoom, username, setUsername }),
    [room, username]
  )

  return (
    <ChatAppContext.Provider value={value}>{children}</ChatAppContext.Provider>
  )
}

export interface ChatAppDetails {
  username?: string
  setUsername: Dispatch<SetStateAction<string | undefined>>
  room?: string
  setRoom: Dispatch<SetStateAction<string | undefined>>
}

export interface ChatAppProviderProps {
  children: ReactNode
}
