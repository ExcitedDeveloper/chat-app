import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import './Header.css'

const Header = () => {
  return (
    <header className='chat-header'>
      <h1>
        <FontAwesomeIcon icon={faSmile} />
        {' Chat App'}
      </h1>
      <a className='btn'>Leave Room</a>
    </header>
  )
}

export default Header
