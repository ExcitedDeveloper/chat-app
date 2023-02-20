import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import { ChatAppContext } from '../../ChatAppContext'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const Header = () => {
  const { socket } = useContext(ChatAppContext)
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
          confirmAlert({
            title: 'Are you sure you want to leave the chat room?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                  socket?.disconnect()
                  navigate('/')
                },
              },
              {
                label: 'No',
              },
            ],
          })
        }}
      >
        Leave Room
      </a>
    </header>
  )
}

export default Header
