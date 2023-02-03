import { useContext, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import { ChatAppContext } from '../../ChatAppContext'
import './JoinRoom.css'

const JoinRoom = () => {
  const navigate = useNavigate()
  const { username, room, setUsername, setRoom } = useContext(ChatAppContext)

  const handleSubmit = (e: any) => {
    console.log(`handleSubmit`)
    e.preventDefault()
    navigate('/chat', { state: { username, room } })
  }

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleRoomChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRoom(e.target.value)
  }

  console.log(`render JoinRoom`)
  return (
    <div className='join-container'>
      <header className='join-header'>
        <h1>
          <FontAwesomeIcon icon={faSmile} /> Chat App
        </h1>
      </header>
      <main className='join-main'>
        <form onSubmit={handleSubmit}>
          <div className='join-control'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Enter username...'
              required
              onChange={handleUsernameChange}
              value={username}
            />
          </div>
          <div className='join-control'>
            <label htmlFor='room'>Room</label>
            <select
              name='room'
              id='room'
              value={room}
              onChange={handleRoomChange}
            >
              <option value='JavaScript'>JavaScript</option>
              <option value='Python'>Python</option>
              <option value='PHP'>PHP</option>
              <option value='C#'>C#</option>
              <option value='Ruby'>Ruby</option>
              <option value='Java'>Java</option>
            </select>
          </div>
          <button type='submit' className='btn'>
            Join Chat
          </button>
        </form>
      </main>
    </div>
  )
}

export default JoinRoom
