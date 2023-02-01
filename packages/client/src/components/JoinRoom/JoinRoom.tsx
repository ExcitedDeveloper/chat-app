import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './JoinRoom.css'

const JoinRoom = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>()
  const [room, setRoom] = useState<string>('JavaScript')

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
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='username' className='mb-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              placeholder='Enter username...'
              onChange={handleUsernameChange}
              value={username}
            />
          </Form.Group>
          <Form.Group controlId='room' className='mb-5'>
            <Form.Label>Room</Form.Label>
            <Form.Select value={room} onChange={handleRoomChange}>
              <option value='JavaScript'>JavaScript</option>
              <option value='Python'>Python</option>
              <option value='PHP'>PHP</option>
              <option value='C#'>C#</option>
              <option value='Ruby'>Ruby</option>
              <option value='Java'>Java</option>
            </Form.Select>
          </Form.Group>
          <Button
            as='input'
            type='submit'
            value='Join Chat'
            className='d-block w-100 join-submit'
          />
        </Form>
      </main>
    </div>
  )
}

export default JoinRoom
