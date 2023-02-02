import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Chat.css'

const Chat = () => {
  const { state } = useLocation()
  const { username, room } = state

  // useEffect(() => {

  // },[name, room])

  return (
    <div className='chat-container'>
      <div>Username: {username}</div>
      <div>Room: {room}</div>
    </div>
  )
}

export default Chat
