import { Colour } from "./Colour"

export class Player {

    private socketId: string
    private colour: Colour
    private minPointMovesLeft: number

    constructor(colour: Colour){
        //this.games.get(roomId) === null ? Colour.BLACK : Colour.WHITE
        this.colour = colour
        this.minPointMovesLeft = 167
    }

    public getSocketId = (): string => this.socketId

    public setSocketId = (socketId: string): void => { this.socketId = socketId }
    
    public getColour = (): Colour => this.colour 

    public getMinPointMovesLeft = (): number => this.minPointMovesLeft

    public setMinPointMovesLeft = (minPointMovesLeft: number): void => {
        this.minPointMovesLeft = minPointMovesLeft
    }
}