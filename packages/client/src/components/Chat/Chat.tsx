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
import { User } from '@chatapp/server/utils/users'
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

const Chat = () => {
  const { userName, room, setUsers, messages, setMessages, socket, setSocket } =
    useContext(ChatAppContext)

  useEffect(() => {
    if (!setSocket) return

    let newSocket: Socket<ServerToClientEvents, ClientToServerEvents>

    if (process.env.NODE_ENV === 'production') {
      const serverUrl = 'https://www.chat.server.stevehunley.dev/'
      newSocket = io(serverUrl)
    } else {
      newSocket = io('http://localhost:3000')
    }

    setSocket(newSocket)
  }, [setSocket])

  useEffect(() => {
    if (socket && socket.id && userName && room) {
      socket.emit('joinRoom', { userName, room })
    }
  }, [userName, room, socket])

  useEffect(() => {
    if (!socket) return

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

    return () => {
      socket.off('roomUsers')
      socket.off('message')
    }
  }, [socket])

  return (
    <div className='chat-container d-flex flex-column'>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default Chat
