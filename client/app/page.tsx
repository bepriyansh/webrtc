'use client';

import { useSocketStore } from '@/store/socket'
import React, { useEffect } from 'react'

export default function App() {
  const { connect, joinRoom, users } = useSocketStore()

  useEffect(() => {
    connect()
  }, [connect])

  useEffect(() => {
    joinRoom('priyansh@example.com', 'room1')
  }, [joinRoom])

  return (
    <div>
      <h1>Users in Room:</h1>
      <ul>
        {users.map((email, i) => (
          <li key={i}>{email}</li>
        ))}
      </ul>
    </div>
  )
}
