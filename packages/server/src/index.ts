import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} from '../utils/users'
import { formatMessage, SocketMessages, EmitMessages } from '../utils/messages'
import dotenv from 'dotenv'
import { infoLogger } from '../utils/loggers'

dotenv.config()

const app = express()
const server = http.createServer(app)

infoLogger.info(`process.env.NODE_ENV = ${process.env.NODE_ENV}`)
const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://www.chat.stevehunley.dev'
        : 'http://127.0.0.1:5173',
  },
})

const botName = 'ChatApp Bot'

app.get('/', (req, res) => {
  res.send('<h1>Hello world!!!!</h1>')
})

io.on(SocketMessages.Connection, (socket) => {
  socket.on(SocketMessages.JoinRoom, ({ userName, room }) => {
    const user = userJoin(socket.id, userName, room)

    socket.join(user.room)

    // Welcome current user
    socket.emit(
      EmitMessages.Message,
      formatMessage(botName, 'Welcome to the ChatApp')
    )

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        EmitMessages.Message,
        formatMessage(botName, `${user.userName} has joined the chat`)
      )

    // Send users and room info
    io.to(user.room).emit(EmitMessages.RoomUsers, {
      room: user.room,
      users: getRoomUsers(user.room),
    })
  })

  // Listen for chatMessage
  socket.on(SocketMessages.ChatMessage, (msg) => {
    const user = getCurrentUser(socket.id)

    if (!user) return

    io.to(user.room).emit(
      EmitMessages.Message,
      formatMessage(user.userName, msg)
    )
  })

  // Runs when client disconnects
  socket.on(SocketMessages.Disconnect, () => {
    const user = userLeave(socket.id)

    if (!user) return

    io.to(user.room).emit(
      EmitMessages.Message,
      formatMessage(botName, `${user.userName} has left the chat`)
    )

    // Send users and room info
    io.to(user.room).emit(EmitMessages.RoomUsers, {
      room: user.room,
      users: getRoomUsers(user.room),
    })
  })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
