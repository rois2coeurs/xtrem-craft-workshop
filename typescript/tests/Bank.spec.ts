import {Currency} from '../src/Currency'
import {Bank} from '../src/Bank'
import {MissingExchangeRateError} from '../src/errors/MissingExchangeRateError'
import {Money} from "../src/Money";
import {BankBuilder} from "../src/BankBuilder";

describe('Bank', function () {

  test('convert from eur to usd returns', () => {
    const bank = BankBuilder.aBank()
        .withPivotCurrency(Currency.EUR)
        .withExchangeRate(Currency.USD,1.2)
        .build();
    const money: Money = Money.create(10, Currency.EUR)
    const result: Money = bank.convertMoney(money, Currency.USD)
    expect(result).toEqual(Money.create(12, Currency.USD))
  })

  test('convert from usd to usd returns same value', () => {
    const bank:Bank = BankBuilder.aBank()
        .withPivotCurrency(Currency.EUR)
        .withExchangeRate(Currency.USD,1.2)
        .build();
    const money: Money = Money.create(10, Currency.USD)
    const result: Money = bank.convertMoney(money, Currency.USD)
    expect(result).toEqual(Money.create(10, Currency.USD))
  })

  test('convert throws error in case of missing exchange rates', () => {
    const bank:Bank = BankBuilder.aBank()
        .withPivotCurrency(Currency.EUR)
        .withExchangeRate(Currency.USD, 1.2)
        .build();
    const money: Money = Money.create(10, Currency.EUR)
    const action: () => Money = () => bank.convertMoney(money, Currency.KRW)
    const action2: () => Money = () => bank.convertMoney(Money.create(10, Currency.EUR), Currency.KRW)
    expect(action).toThrow(MissingExchangeRateError).toThrow('EUR-> KRW')
  })

  test('convert with different exchange rates returns different numbers', () => {
    const bank:Bank = BankBuilder.aBank()
        .withPivotCurrency(Currency.EUR)
        .withExchangeRate(Currency.USD, 1.2)
        .build();
    const result1: Money = bank.convertMoney(Money.create(10, Currency.EUR), Currency.USD)
    bank.addExchangeRate(Currency.EUR, Currency.USD, 1.3)
    const result2: Money = bank.convertMoney(Money.create(10, Currency.EUR), Currency.USD)
    bank.addExchangeRate(Currency.EUR, Currency.USD, 1.5)
    const result3: Money = bank.convertMoney(Money.create(10, Currency.EUR), Currency.USD)
    expect(result1).toEqual(Money.create(12, Currency.USD))
    expect(result2).toEqual(Money.create(13, Currency.USD))
    expect(result3).toEqual(Money.create(15, Currency.USD))
  })
})
