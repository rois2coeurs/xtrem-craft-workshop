import { Money } from '../Money'

export class InfiniteMoneyError extends Error {
    constructor () {
        super('Infinite amount')
    }
}
