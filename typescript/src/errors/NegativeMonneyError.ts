import { Money } from '../Money'

export class NegativeMoneyError extends Error {
    constructor (amount : number) {
        super('Negative amount number : ' + amount)
    }
}
