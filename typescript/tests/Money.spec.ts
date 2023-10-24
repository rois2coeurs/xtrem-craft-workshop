import {Currency} from '../src/Currency'
import {Money} from "../src/Money";
import {NegativeMoneyError} from "../src/errors/NegativeMonneyError";
import {DivideByZeroError} from "../src/errors/DivideByZeroError";
import {MissMatchCurrencyError} from "../src/errors/MissMatchCurrencyError";
import {InfiniteMoneyError} from "../src/errors/InfiniteMoneyError";

describe('Money', function () {

    test('cant instantiate infinite amount of money', () => {
        expect(() => Money.create(Infinity, Currency.EUR)).toThrow(InfiniteMoneyError)
    })

    test('cant instantiate negative amount of money', () => {
        expect(() => Money.create(-1 , Currency.EUR)).toThrow(NegativeMoneyError)
    })

    test('add money return a new money', () => {
        let money = Money.create(5, Currency.USD)
        let moneyToAdd = Money.create(10, Currency.USD)
        money = money.add(moneyToAdd);
        expect(money.amount).toBe(15)
    })

    test('multiply money return a new money', () => {
        let money = Money.create(10, Currency.EUR)
        money = money.times(2);
        expect(money.amount).toBe(20)
    })

    test('divide money return a new money', () => {
        let money = Money.create(4002, Currency.KRW)
        money = money.divide(4);
        expect(money.amount).toBe(1000.5)
    })

    test('cant divide by zero', () => {
        let money = Money.create(10, Currency.EUR)
        expect(() => money.divide(0)).toThrow(DivideByZeroError)
    })

    test('cant add two different currency', () => {
        let money = Money.create(10, Currency.EUR)
        let money2 = Money.create(10, Currency.KRW)
        expect(() => money.add(money2)).toThrow(MissMatchCurrencyError)
    })

})