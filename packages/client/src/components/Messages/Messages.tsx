import { useContext } from 'react'
import { ChatAppContext } from '../../ChatAppContext'
import { Message } from '@chatapp/server/utils/messages'
import './Messages.css'

const Messages = () => {
  const { messages } = useContext(ChatAppContext)

  return (
    <div className='chat-messages'>
      {messages &&
        messages.length > 0 &&
        messages.map((msg: Message) => (
          <div className='chat-message'>
            <p className='chat-meta'>
              {msg.userName} <span>{msg.time}</span>
            </p>
            <p>{msg.text}</p>
          </div>
        ))}
      {(!messages || messages.length <= 0) && <div>No messages</div>}
    </div>
  )
}

export default Messages
