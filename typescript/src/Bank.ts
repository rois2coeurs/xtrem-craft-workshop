import {Currency} from './Currency'
import {MissingExchangeRateError} from './errors/MissingExchangeRateError'
import {Money} from "./Money";

export class Bank {
  private readonly _exchangeRates: Map<string, number> = new Map()

  /**
   * @param current
   * @param target
   * @param rate
   * @returns {Bank}
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
   * @returns {void}
   */
  addExchangeRate (current: Currency, target: Currency, rate: number): void {
    this._exchangeRates.set(current + '->' + target, rate)
  }

  /**
   * @param amount
   * @param current
   * @param target
   * @returns {number}
   */
  convert (amount: number, current: Currency, target: Currency): number {
    const money: Money = Money.create(amount, current)
    return this.convertMoney(money, target).amount;
  }

  convertMoney(money: Money, target: Currency): Money {
    if (!this.canConcert(money, target)) {
      throw new MissingExchangeRateError(money.currency, target)
    }

    return money.hasCurrency(target)
        ? money
        : money.convert(this.getExchangeRate(money, target), target)
  }

  private canConcert(money: Money, target: Currency) {
    return money.hasCurrency(target) || this._exchangeRates.has(money.currency + '->' + target);
  }

  private getExchangeRate(money: Money, target: Currency) {
    return this._exchangeRates.get(money.currency + '->' + target);
  }
}

