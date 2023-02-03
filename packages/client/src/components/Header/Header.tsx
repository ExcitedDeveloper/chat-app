import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import Button from 'react-bootstrap/Button'
import './Header.css'

const Header = () => {
  return (
    <header className='chat-header'>
      <h1>
        <FontAwesomeIcon icon={faSmile} />
        {' Chat App'}
      </h1>
      <Button className='bg-light text-primary'>Leave Room</Button>
    </header>
  )
}

export default Header
