import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faComments } from '@fortawesome/free-solid-svg-icons'
import { ChatAppContext } from '../../ChatAppContext'
import './Sidebar.css'

const Sidebar = () => {
  const { username, room } = useContext(ChatAppContext)

  return (
    <div className='chat-sidebar'>
      <h3>
        <FontAwesomeIcon icon={faComments} />
        {room}
      </h3>
      <h2 id='room-name'>{'JavaScript'}</h2>
      <h3>
        <FontAwesomeIcon icon={faUsers} />
        {' Users:'}
      </h3>
      <ul id='users'>
        <li>{username}</li>
      </ul>
    </div>
  )
}

export default Sidebar
