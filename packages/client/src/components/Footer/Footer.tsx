import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className='chat-form-container'>
        <form id='chat-form' className='chat-form'>
          <input
            id='msg'
            type='text'
            required
            autoComplete='off'
            placeholder='Enter Message'
          />
          <button className='btn'>
            <FontAwesomeIcon icon={faPaperPlane} className='chat-paperplane' />
            {' Send'}
          </button>
        </form>
      </div>
    </footer>
  )
}

export default Footer
