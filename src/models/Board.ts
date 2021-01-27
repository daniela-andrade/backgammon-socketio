import {Colour, Pip} from './models'

export class Board {

    private pips: Pip[]

    constructor() {
        this.initializeBoard()
    }

    private initializeBoard = (): void => {
        this.pips = [
            new Pip(Colour.BLACK, 2),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.WHITE, 5),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.WHITE, 3),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.BLACK, 5),
            new Pip(Colour.WHITE, 5),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.BLACK, 3),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.BLACK, 5),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.NONE,  0),
            new Pip(Colour.WHITE, 2),
        ]
    }

    getPip = (col: number):Pip => {
        if (col < this.pips.length) {
            return this.pips[col]
        } else {
            console.warn()
        }
    }

    printBoard = (): void => {

        const getCellString = (pip: Pip, rowIndex: number, col: number) => {
            const hasChecker: boolean = pip.getNumCheckers() >= rowIndex
            const code: string = pip.getColourCode()
            let cell: string = hasChecker ? code : '-'
            const isBar: boolean = (col === 6 || col === 17)
            cell += isBar ? '-' : ''
            return cell
        }

        let row: string
        // TOP OF THE BOARD
        for (let rowIndex=1; rowIndex<6; rowIndex++) {
            row = ''
            for (let col=11; col>=0; col--) {
                row += getCellString(this.getPip(col), rowIndex, col)
            }
            console.log(row)
        }
        // DIVISOR
        console.log('-------------')
        // BOTTOM OF THE BOARD
        for (let rowIndex=5; rowIndex > 0; rowIndex--) {
            row = ''
            for (let col=12; col<24; col++) {
                row += getCellString(this.getPip(col), rowIndex, col)
            }
            console.log(row)
        }
    }
}