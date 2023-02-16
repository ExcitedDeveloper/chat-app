import { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import { ChatAppContext } from '../../ChatAppContext'
import './Header.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { userName, room, socket } = useContext(ChatAppContext)
  const navigate = useNavigate()

  return (
    <header className='chat-header'>
      <h1>
        <FontAwesomeIcon icon={faSmile} />
        {' Chat App'}
      </h1>
      <a
        className='btn'
        onClick={() => {
          socket?.disconnect()
          navigate('/')
        }}
      >
        Leave Room
      </a>
    </header>
  )
}

export default Header
