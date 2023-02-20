import { useEffect, useContext, useState } from 'react'
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
import { useLocation } from 'react-router-dom'
import './Chat.css'

interface ServerToClientEvents {
  message: (msg: Message) => void
  roomUsers: (data: RoomUsersEvent) => void
}

interface ClientToServerEvents {
  joinRoom: (data: any) => void
}

const Chat = () => {
  const { setUsers, setMessages, setSocket, socket } =
    useContext(ChatAppContext)
  const location = useLocation()

  useEffect(() => {
    if (socket?.id) return

    let newSocket: Socket<ServerToClientEvents, ClientToServerEvents>

    if (process.env.NODE_ENV === 'production') {
      const serverUrl = 'https://www.chat.server.stevehunley.dev/'
      newSocket = io(serverUrl)
    } else {
      newSocket = io('http://localhost:3000')
    }

    setTimeout(() => {
      console.log(`********* newSocket`, newSocket)
      setSocket && setSocket(newSocket)
    }, 100)

    return () => {
      newSocket.off('roomUsers')
      newSocket.off('message')
    }
  }, [])

  useEffect(() => {
    if (socket?.connected) {
      console.log(`********** socket.connected id`, socket?.id)
      if (socket?.id && location.state.userName && location.state.room) {
        socket.emit('joinRoom', {
          userName: location.state.userName,
          room: location.state.room,
        })
      }

      socket.on('message', (message: Message) => {
        if (!setMessages || !location.state.userName) return

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

        if (eventRoom === location.state.room) {
          setUsers && setUsers(users)
        }
      })
    }
  }, [socket?.connected])

  return (
    <div className='chat-container d-flex flex-column'>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default Chat
