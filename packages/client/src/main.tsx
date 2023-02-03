import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChatAppProvider } from './ChatAppContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChatAppProvider>
      <App />
    </ChatAppProvider>
  </React.StrictMode>
)
