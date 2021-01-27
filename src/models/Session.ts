import {Socket} from 'socket.io'
export type Session = {
    socket: Socket,
    roomId: string
}