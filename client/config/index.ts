export const config = {
    SOCKET_SERVER_URL: process.env.NEXT_PUBLIC_SOCKET_SERVER || "http://localhost:8081"
}


export const socketEvents = {
    connection : "connection",
    joinRoom : "join-room",
    userJoined : "user-joined",
}