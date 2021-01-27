import { Board } from "./Board"
import { Die } from "./Die"
import { Player } from "./Player"

export class Game {

    private roomId: string
    private board: Board
    private players: Player[]
    private dices: Die[]
    private turn: number

    constructor(roomId: string){
        this.roomId = roomId
        this.board = new Board()
        this.players = []
        this.dices = []
    }

    public getRoomId = (): string => this.roomId

    public getBoard = (): Board => this.board

    public getPlayers = (): Player[] => this.players

    public getDices = (): Die[] => this.dices

    public getTurn = (): number => this.turn

    public addPlayer = (player: Player): void => {
        if (this.players.length > 1) {
            console.log(`Room ${this.roomId} is full, player ${player.getSocketId} can't join.`)
        } else {
            this.players.push(player)
            console.log(`Player ${player.getSocketId} joined room ${this.roomId}`)
        }

    }

    public rollDices = () => {
        this.dices.forEach( die => die.roll() )
    }


}