import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './JoinRoom.css'

const JoinRoom = () => {
  return (
    <div className='join-container'>
      <header className='join-header'>
        <h1>
          <FontAwesomeIcon icon={faSmile} /> Chat App
        </h1>
      </header>
      <main className='join-main'>
        <Form>
          <Form.Group controlId='username' className='mb-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder='Enter username...' />
          </Form.Group>
          <Form.Group controlId='room'>
            <Form.Label>Room</Form.Label>
            <Form.Select>
              <option value='JavaScript' selected>
                JavaScript
              </option>
              <option value='Python'>Python</option>
              <option value='PHP'>PHP</option>
              <option value='C#'>C#</option>
              <option value='Ruby'>Ruby</option>
              <option value='Java'>Java</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </main>
    </div>
  )
}

export default JoinRoom
