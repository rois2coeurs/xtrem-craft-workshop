import { Money } from '../Money'

export class DivideByZeroError extends Error {
    constructor () {
        super('Money.ts -> divide method : You try to divide by zero !')
    }
}