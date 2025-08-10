import { create } from 'zustand'
import { io, Socket } from 'socket.io-client'
import { config, socketEvents } from '@/config'

const SOCKET_SERVER_URL = config.SOCKET_SERVER_URL

interface SocketStore {
  socket: Socket | null
  users: string[]
  joinRoom: (emailId: string, roomId: string) => void
  connect: () => void
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  users: [],

  joinRoom: (emailId, roomId) => {
    const socket = get().socket
    if (!socket) return

    // Emit join-room with emailId and roomId
    socket.emit(socketEvents.joinRoom, { emailId, roomId })
  },

  connect: () => {
    if (get().socket) return // already connected

    const socket = io(SOCKET_SERVER_URL)

    socket.on('connect', () => {
      console.log('Connected to socket server:', socket.id)
      // Optionally you can auto join a room here if you want
      // get().joinRoom('user@example.com', 'room1')
    })

    socket.on(socketEvents.userJoined, (data: { emailId: string }) => {
      console.log('New user joined:', data.emailId)
      set((state) => ({
        users: [...state.users, data.emailId],
      }))
    })

    set({ socket })
  },
}))
