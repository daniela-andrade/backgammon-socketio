import express, { Application } from "express"
import SocketIO, { Socket } from "socket.io"
import uuid from "uuid"
import http, { Server } from "http"
import { Events, getMessages } from "./constants"
import { Game, Session } from "./models/models"

export class BackgammonServer {

    app: Application
    port: number | string
    httpServer: Server
    io: SocketIO.Server
    sessions: Map<string, Session>
    games: Map<string, Game>
    
    constructor() {
        this.app = express().use(express.static('public'))
        this.port = process.env.SERVER_PORT
        this.httpServer = http.createServer(this.app)
        this.io = new SocketIO.Server(this.httpServer)
        this.sessions = new Map()
        this.games = new Map()
        this.listen()
    }
    
    private listen = () => {
        this.httpServer.listen(this.port, () => {
            console.log('Running server on port %s', this.port)})
    
        this.io.on(Events.CONNECT, (socket) => {
            socket.emit('connected', socket.id)
            var messages = getMessages(socket.id, this.port)
            console.log(messages.connect)
            
            socket.on(Events.DISCONNECT, () => {
                console.log(messages.disconnect)
            })

            socket.on(Events.CREATE, () => {
                console.log(messages.create)
                var game: Game = this.createNewGame(socket)
                socket.join(game.getRoomId)
                socket.emit('gameCreated', game)
            })

            socket.on(Events.JOIN, (roomId: string) => {
                socket.join(roomId)
                console.log(`Socket ${socket.id} joined room ${roomId}`)
                this.io.to(roomId).emit('gameReady', this.games.get(roomId))
                socket.emit('joined', roomId)
            })

            socket.on(Events.ROLL, () => {
                console.log(messages.roll)
                const roomId = this.getRoomId(socket)
                const game = this.games.get(roomId)
                game.rollDices()
                socket.emit('rolled', game.getDices())
            })

            socket.on(Events.MOVE, () => {
                console.log(messages.move)
            })

            socket.on(Events.DOUBLE, () => {
                console.log(messages.double)
            })

            socket.on(Events.RESPONSE_DOUBLE, () => {
                console.log(messages.responseDouble)
            })

            socket.on(Events.RESIGN, () => {
                console.log(messages.resign)
            })
        })
    }

    private createNewGame = (socket: SocketIO.Socket): Game => {
        const roomId = uuid.v4()
        const game = new Game(roomId)
        this.games.set(roomId, game)
        this.sessions.set(socket.id, {socket: socket, roomId: roomId })
        return game
    }

    private getRoomId = (socket: SocketIO.Socket): string => {
        return this.sessions.get(socket.id).roomId
    }

    public getApp = (): Application => this.app

}