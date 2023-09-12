import {Currency} from './Currency'
import {MissingExchangeRateError} from './MissingExchangeRateError'

export class Bank {
  private readonly _exchangeRates: Map<string, number> = new Map()

  /**
   * @param current
   * @param target
   * @param rate
   */
  static withExchangeRate (current: Currency, target: Currency, rate: number): Bank {
    const bank = new Bank()
    bank.addExchangeRate(current, target, rate)
    return bank
  }

  /**
   * @param current
   * @param target
   * @param rate
   */
  addExchangeRate (current: Currency, target: Currency, rate: number): void {
    this._exchangeRates.set(current + '->' + target, rate)
  }

  /**
   * @param amount
   * @param current
   * @param target
   */
  convert (amount: number, current: Currency, target: Currency): number {
    if (!(current === target || this._exchangeRates.has(current + '->' + target))) { throw new MissingExchangeRateError(current, target) }

    return target === current
        ? amount
        : amount * this._exchangeRates.get(current + '->' + target)
  }
}
