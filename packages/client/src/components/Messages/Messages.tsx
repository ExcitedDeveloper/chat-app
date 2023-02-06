import { useContext, useRef, useEffect } from 'react'
import { ChatAppContext } from '../../ChatAppContext'
import { Message } from '@chatapp/server/utils/messages'
import './Messages.css'

const Messages = () => {
  const { messages } = useContext(ChatAppContext)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className='chat-messages'>
      {messages &&
        messages.length > 0 &&
        messages.map((msg: Message) => (
          <div key={crypto.randomUUID()} className='chat-message'>
            <p className='chat-meta'>
              {msg.userName} <span>{msg.time}</span>
            </p>
            <p>{msg.text}</p>
          </div>
        ))}
      {(!messages || messages.length <= 0) && <div>No messages</div>}
      <div ref={messagesEndRef}></div>
    </div>
  )
}

export default Messages
