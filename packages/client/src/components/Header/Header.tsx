import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import { ChatAppContext } from '../../ChatAppContext'
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import './Header.css'

const Header = () => {
  const { socket, setMessages, setRoom, setUserName } =
    useContext(ChatAppContext)
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
                  setMessages && setMessages([])
                  setUserName && setUserName('')
                  setRoom && setRoom('')
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
