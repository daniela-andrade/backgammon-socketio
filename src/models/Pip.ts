import {Colour} from './Colour'

export class Pip {
    
    private colour: Colour = Colour.NONE
    private numCheckers: number = 0

    constructor(colour: Colour, numCheckers: number){
        this.colour = colour
        this.numCheckers = numCheckers
    }

    setNumCheckers = (numCheckers: number) : void => { this.numCheckers = numCheckers }
    getNumCheckers = () : number => this.numCheckers

    setColour = (colour: Colour) : void => { this.colour = colour }
    getColour = () : number => this.colour
    
    getColourCode = () : string => {
        switch(this.colour){
            case Colour.WHITE:
                return '\u25BC' 
            case Colour.BLACK:
                return '\u25C9' 
            default:
                return '-' 
        }
    } 

    isEmpty = () => this.numCheckers === 0
}