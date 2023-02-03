import Sidebar from '../Sidebar/Sidebar'
import Messages from '../Messages/Messages'
import './Main.css'

const Main = () => {
  return (
    <main className='chat-main'>
      <Sidebar />
      <Messages />
    </main>
  )
}

export default Main
