import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faComments } from '@fortawesome/free-solid-svg-icons'
import { ChatAppContext } from '../../ChatAppContext'
import { User } from '@chatapp/server/utils/users'
import './Sidebar.css'

const Sidebar = () => {
  const { room, users } = useContext(ChatAppContext)

  return (
    <div className='chat-sidebar'>
      <h3>
        <FontAwesomeIcon icon={faComments} />
        {' Room Name:'}
      </h3>
      <h2 id='room-name'>{room}</h2>
      <h3>
        <FontAwesomeIcon icon={faUsers} />
        {' Users:'}
      </h3>
      <ul id='users'>
        {users &&
          users.length > 0 &&
          users.map((user: User) => (
            <li key={crypto.randomUUID()}>{user.userName}</li>
          ))}
      </ul>
    </div>
  )
}

export default Sidebar
