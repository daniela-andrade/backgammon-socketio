export class Die {

    private value: number
    private numUses: number

    constructor(){
        this.numUses = 0
    }

    public getValue = (): number => this.value

    public getNumUses = (): number => this.numUses

    public setToDouble = (): void  => { this.numUses = 2 }

    public roll = (): void  => { this.numUses = Math.ceil(Math.random()*6) }

    public use = (): void => { this.numUses = this.numUses - 1}


}