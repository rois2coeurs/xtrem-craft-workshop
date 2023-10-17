import {Currency} from '../src/Currency'
import {Bank} from '../src/Bank'
import {MissingExchangeRateError} from '../src/MissingExchangeRateError'
import {Money} from "../src/Money";

describe('Bank', function () {

  test('convert from eur to usd returns number', () => {
    const bank:Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const result: number = bank.convert(10, Currency.EUR, Currency.USD)
    expect(result).toBe(12)
  })

  test('convert from usd to usd returns same value', () => {
    const bank:Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const result = bank.convert(10, Currency.USD, Currency.USD)
    expect(result).toBe(10)
  })

  test('convert throws error in case of missing exchange rates', () => {
    const bank:Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const action: () => number = () => bank.convert(10, Currency.EUR, Currency.KRW)
    expect(action).toThrow(MissingExchangeRateError).toThrow('EUR-> KRW')
  })

  test('convert with different exchange rates returns different numbers', () => {
    const bank:Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const result1: Money = bank.convert(new Money(10, Currency.EUR), Currency.USD)
    bank.addExchangeRate(Currency.EUR, Currency.USD, 1.3)
    const result2: number = bank.convert(10, Currency.EUR, Currency.USD)
    bank.addExchangeRate(Currency.EUR, Currency.USD, 1.5)
    const result3: number = bank.convert(10, Currency.EUR, Currency.USD)
    expect(result1).toBe(12)
    expect(result2).toBe(13)
    expect(result3).toBe(15)
  })

})
