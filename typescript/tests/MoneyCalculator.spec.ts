import { Currency } from '../src/Currency'
import { MoneyCalculator } from '../src/MoneyCalculator'

describe('Money', function () {
  test('add in usd returns number', () => {
    let sum: any = MoneyCalculator.add(5, Currency.USD, 10);
    expect(sum).toBeNumber()
    expect(sum).not.toBeNull()
  })

  test('multiply in eur returns positive number', () => {
    let times = MoneyCalculator.times(10, Currency.EUR, 2);
    expect(times).toBeGreaterThan(0)
  })

  test('divide in korean won returns number', () => {
    let divide = MoneyCalculator.divide(4002, Currency.KRW, 4);
    expect(1000.5, ).toBe(divide)
  })
})
