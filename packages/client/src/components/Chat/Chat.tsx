import { useEffect, useState, useContext } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import { io, Socket } from 'socket.io-client'
import { ChatAppContext } from '../../ChatAppContext'
import {
  RoomUsersEvent,
  Message,
  MAX_MESSAGES,
} from '@chatapp/server/utils/messages'
import './Chat.css'

interface ServerToClientEvents {
  pong: () => void
  message: (msg: Message) => void
  roomUsers: (data: RoomUsersEvent) => void
}

interface ClientToServerEvents {
  ping: () => void
  joinRoom: (data: any) => void
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>

if (process.env.NODE_ENV === 'production') {
  const serverUrl = 'https://www.chat.server.stevehunley.dev/'
  socket = io(serverUrl)
} else {
  socket = io('http://localhost:3000')
}

const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [lastPong, setLastPong] = useState<string | null>(null)
  const { userName, room, setUsers, messages, setMessages } =
    useContext(ChatAppContext)

  useEffect(() => {
    if (userName && room) {
      socket.emit('joinRoom', { userName, room })
    }
  }, [userName, room])

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('message', (message: Message) => {
      if (!setMessages || !userName) return

      setMessages((currMessages) => {
        const newMessages = [...(currMessages || [])]

        // If message already added, don't add again
        if (
          newMessages.some(
            (msg) =>
              msg.text === message.text &&
              msg.time === message.time &&
              msg.userName === message.userName
          )
        ) {
          return newMessages
        }

        if (newMessages.length >= MAX_MESSAGES) {
          newMessages.pop()
        }

        newMessages.push(message)

        return newMessages
      })
    })

    socket.on('roomUsers', (data: RoomUsersEvent) => {
      const { room: eventRoom, users } = data

      if (eventRoom === room) {
        setUsers && setUsers(users)
      }
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('pong', () => {
      setLastPong(new Date().toISOString())
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('pong')
    }
  }, [])

  const sendPing = () => {
    socket.emit('ping')
  }

  return (
    <div className='chat-container d-flex flex-column'>
      <div>
        <p>Connected: {'' + isConnected}</p>
        <p>Last pong: {lastPong || '-'}</p>
        <button onClick={sendPing}>Send ping</button>
      </div>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default Chat
