import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import JoinRoom from './components/JoinRoom/JoinRoom'
import Chat from './components/Chat/Chat'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<JoinRoom />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </Router>
  )
}

export default App
