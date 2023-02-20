import { useContext, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { ChatAppContext } from '../../ChatAppContext'
import './Footer.css'

const Footer = () => {
  const { socket } = useContext(ChatAppContext)
  const sendMessageRef = useRef<HTMLInputElement>(null)

  return (
    <footer>
      <div className='chat-form-container'>
        <form id='chat-form' className='chat-form'>
          <input
            ref={sendMessageRef}
            id='msg'
            type='text'
            required
            autoComplete='off'
            placeholder='Enter Message'
          />
          <button
            className='btn'
            onClick={(e) => {
              e.preventDefault()
              if (sendMessageRef.current) {
                socket?.emit('chatMessage', sendMessageRef.current.value)
                sendMessageRef.current.value = ''
              }
            }}
          >
            <FontAwesomeIcon icon={faPaperPlane} className='chat-paperplane' />
            {' Send'}
          </button>
        </form>
      </div>
    </footer>
  )
}

export default Footer
