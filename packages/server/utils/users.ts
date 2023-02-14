const users: User[] = []

export interface User {
  socketId: string
  userName: string
  room: string
}

// Join user to chat
export const userJoin = (
  socketId: string,
  userName: string,
  room: string
): User => {
  const user = { socketId, userName, room }

  // Don't add the user if it already has been added
  if (!users.some((user) => user.room === room && user.userName === userName)) {
    users.push(user)
  }

  return user
}

// Get current user
export const getCurrentUser = (id: string): User | undefined => {
  return users.find((user) => user.socketId === id)
}

// User leaves chat
export const userLeave = (id: string): User | undefined => {
  const index = users.findIndex((user) => user.socketId === id)

  return index !== -1 ? users.splice(index, 1)[0] : undefined
}

// Get room users
export const getRoomUsers = (room: string): User[] => {
  return users.filter((user) => user.room === room)
}
