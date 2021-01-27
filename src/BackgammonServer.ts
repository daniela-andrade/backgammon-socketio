import express, { Application } from "express"
import SocketIO from "socket.io"
import { v4 as uuidv4 } from 'uuid'
import http, { Server } from "http"
import { Events, getMessages } from "./constants"
import { Game, Session } from "./models/models"
import config from './config'

export class BackgammonServer {

    app: Application
    port: number | string
    httpServer: Server
    io: SocketIO.Server
    sessions: Map<string, Session>
    games: Map<string, Game>

    constructor() {
        this.app = express().use(express.static('public'))
        this.port = config.port
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
            const messages = getMessages(socket.id, this.port)
            console.log(messages.connect)

            socket.on(Events.DISCONNECT, () => {
                console.log(messages.disconnect)
            })

            socket.on(Events.CREATE, () => {
                console.log(messages.create)
                const game: Game = this.createNewGame(socket)
                socket.join(game.getRoomId())
                socket.emit('gameCreated', game.getRoomId())
            })

            socket.on(Events.JOIN, (roomId: string) => {
                socket.join(roomId)
                console.log(`Socket ${socket.id} joined room ${roomId}`)
                this.io.to(roomId).emit('gameReady', roomId)
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
        const roomId = uuidv4()
        const game = new Game(roomId)
        this.games.set(roomId, game)
        this.sessions.set(socket.id, {socket, roomId })
        return game
    }

    private getRoomId = (socket: SocketIO.Socket): string => {
        return this.sessions.get(socket.id).roomId
    }

    public getApp = (): Application => this.app

}