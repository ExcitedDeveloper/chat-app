import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import './Chat.css'

const Chat = () => {
  const { state } = useLocation()
  const { username, room } = state

  // useEffect(() => {

  // },[name, room])

  return (
    <div className='chat-container d-flex flex-column'>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default Chat
