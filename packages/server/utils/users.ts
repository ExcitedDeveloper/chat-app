const users: User[] = []

export interface User {
  id: string
  userName: string
  room: string
}

// Join user to chat
export const userJoin = (id: string, userName: string, room: string): User => {
  const user = { id, userName, room }

  users.push(user)

  return user
}

// Get current user
export const getCurrentUser = (id: string): User | undefined => {
  return users.find((user) => user.id === id)
}

// User leaves chat
export const userLeave = (id: string): User | undefined => {
  const index = users.findIndex((user) => user.id === id)

  return index !== -1 ? users.splice(index, 1)[0] : undefined
}

// Get room users
export const getRoomUsers = (room: string): User[] => {
  return users.filter((user) => user.room === room)
}
