import { Currency } from '../src/Currency'
import { MoneyCalculator } from '../src/MoneyCalculator'

describe('Money', function () {
  test('add in usd returns number', () => {
    let sum: number = MoneyCalculator.add(5, Currency.USD, 10);
    expect(sum).toBe(15)
  })

  test('multiply in eur returns positive number', () => {
    let times: number = MoneyCalculator.times(10, Currency.EUR, 2);
    expect(times).toBe(20)
  })

  test('divide in korean won returns number', () => {
    let divide: number = MoneyCalculator.divide(4002, Currency.KRW, 4);
    expect(divide).toBe(1000.5)
  })
})
