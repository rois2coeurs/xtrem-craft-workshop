import { Currency } from './Currency'

export class MoneyCalculator {
  static add = (amount: number, currency: Currency, amount2: number): number => amount + amount2
  static times = (amount: number, currency: Currency, number: number): number => amount * number
  static divide = (amount: number, currency: Currency, value: number): number => amount / value
}
