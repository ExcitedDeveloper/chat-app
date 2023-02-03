import './Messages.css'

const Messages = () => {
  return (
    <div className='chat-messages'>
      <div className='chat-message'>
        <p className='chat-meta'>
          {'ChatApp Bot'}
          <span>{'7:52 pm'}</span>
        </p>
        <p>{'Welcome to ChatApp!'}</p>
      </div>
    </div>
  )
}

export default Messages
