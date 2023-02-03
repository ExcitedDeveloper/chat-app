import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faComments } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='chat-sidebar'>
      <h3>
        <FontAwesomeIcon icon={faComments} />
        {' Room Name:'}
      </h3>
      <h2 id='room-name'>{'JavaScript'}</h2>
      <h3>
        <FontAwesomeIcon icon={faUsers} />
        {' Users:'}
      </h3>
      <ul id='users'>
        <li>Steve</li>
        <li>Janis</li>
      </ul>
    </div>
  )
}

export default Sidebar
