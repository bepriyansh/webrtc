import dotenv from 'dotenv'
dotenv.config()

export const config = {
    EXPRESSPORT: process.env.EXPRESSPORT,
    SOCKETPORT: process.env.SOCKETPORT
}

export const socketEvents = {
    connection : "connection",
    joinRoom : "join-room",
    userJoined : "user-joined",
}