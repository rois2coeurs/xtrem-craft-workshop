import {Currency} from '../src/Currency'
import {Bank} from '../src/Bank'
import {MissingExchangeRateError} from '../src/errors/MissingExchangeRateError'
import {Money} from "../src/Money";

describe('Bank', function () {

  test('convert from eur to usd returns', () => {
    const bank:Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const money: Money = new Money(10, Currency.EUR)
    const result: number = bank.convert(money, Currency.USD).amount
    expect(result).toBe(12)
  })

  test('convert from usd to usd returns same value', () => {
    const bank:Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const money: Money = new Money(10, Currency.USD)
    const result: number = bank.convert(money, Currency.USD).amount
    expect(result).toBe(10)
  })

  test('convert throws error in case of missing exchange rates', () => {
    const bank:Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const money: Money = new Money(10, Currency.EUR)
    const action: () => number = () => bank.convert(money, Currency.KRW).amount
    const action2: () => number = () => bank.convert(new Money(10, Currency.EUR), Currency.KRW).amount
    expect(action).toThrow(MissingExchangeRateError).toThrow('EUR-> KRW')
  })

  test('convert with different exchange rates returns different numbers', () => {
    const bank:Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const result1: Money = bank.convert(new Money(10, Currency.EUR), Currency.USD)
    bank.addExchangeRate(Currency.EUR, Currency.USD, 1.3)
    const result2: Money = bank.convert(new Money(10, Currency.EUR), Currency.USD)
    bank.addExchangeRate(Currency.EUR, Currency.USD, 1.5)
    const result3: Money = bank.convert(new Money(10, Currency.EUR), Currency.USD)
    expect(result1.amount).toBe(12)
    expect(result2.amount).toBe(13)
    expect(result3.amount).toBe(15)
  })

})
