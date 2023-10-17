  import {Currency} from '../src/Currency'
import {MoneyCalculator} from '../src/MoneyCalculator'
import {Money} from "../src/Money";

describe('Money', function () {
  test('add in usd returns number', () => {
    let sum: number = MoneyCalculator.add(new Money(5, Currency.USD), new Money(10, Currency.USD));
    expect(sum).toBe(15)
  })

  test('multiply in eur returns positive number', () => {
    let times: number = MoneyCalculator.times(new Money(10, Currency.EUR), 2);
    expect(times).toBe(20)
  })

  test('divide in korean won returns number', () => {
    let divide: number = MoneyCalculator.divide(new Money(4002, Currency.KRW), 4);
    expect(divide).toBe(1000.5)
  })
})
