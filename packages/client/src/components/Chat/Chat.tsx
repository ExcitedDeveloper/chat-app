import { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import { io, Socket } from 'socket.io-client'
import './Chat.css'

interface ServerToClientEvents {
  pong: () => void
}

interface ClientToServerEvents {
  ping: () => void
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>

console.log(`process.env.NODE_ENV`, process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  const serverUrl = 'https://www.chat.server.stevehunley.dev/'
  socket = io(serverUrl)
} else {
  socket = io()
}

const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [lastPong, setLastPong] = useState<string | null>(null)

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
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
