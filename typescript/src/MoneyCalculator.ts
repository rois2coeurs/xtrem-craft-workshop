import { Money } from './Money'

export class MoneyCalculator {
  static add = (money: Money, moneyToAdd: Money): number => money.amount + moneyToAdd.amount
  static times = (money: Money, time: number): number => money.amount * time
  static divide = (money: Money, divide: number): number => money.amount / divide
}
