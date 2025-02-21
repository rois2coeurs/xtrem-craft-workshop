import {Bank} from "../src/Bank";
import {Currency} from "../src/Currency";
import {MissingExchangeRateError} from "../src/errors/MissingExchangeRateError";
import {Money} from "../src/Money";
import {Portfolio} from "../src/Portfolio";

describe('Portfolio', function (): void {

    test('Empty Portfolio => 0 eur', function (): void {
        const portfolio: Portfolio = new Portfolio()

        const bank: Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
        const converted: Money = portfolio.evaluate(Currency.EUR, bank)
        expect(converted.amount).toBe(0)
        expect(converted.currency).toBe(Currency.EUR)
    })

    test('One currency in Portfolio', function (): void {
        const portfolio: Portfolio = new Portfolio()
        const bank: Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
        portfolio.add(Money.create(10, Currency.EUR));
        portfolio.add(Money.create(5, Currency.EUR));

        const converted: Money = portfolio.evaluate(Currency.EUR, bank)
        expect(converted).toEqual(Money.create(15, Currency.EUR))
    })

    test('Evaluate multiple currency with one already in the portfolio', function (): void {
        const portfolio: Portfolio = new Portfolio()

        const bank: Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
        portfolio.add(Money.create(10, Currency.EUR))
        portfolio.add(Money.create(10, Currency.USD))

        const amount: Money = portfolio.evaluate(Currency.USD, bank)
        expect(amount).toEqual(Money.create(22, Currency.USD))
    })

    test('Evaluate multiple currency with a non existing change rate', function (): void {
        const portfolio: Portfolio = new Portfolio()

        const bank: Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
        portfolio.add(Money.create(10, Currency.EUR));
        portfolio.add(Money.create(10, Currency.USD));

        const action = () => portfolio.evaluate(Currency.KRW, bank)
        expect(action).toThrow(MissingExchangeRateError)
    })

    test('Evaluate multiple currency with a non existing change rate', function (): void {
        const portfolio: Portfolio = new Portfolio()

        const bank: Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
        portfolio.add(Money.create(0, Currency.EUR))
        portfolio.add(Money.create(10, Currency.USD))

        const amount: Money = portfolio.evaluate(Currency.USD, bank)
        expect(amount).toEqual(Money.create(10, Currency.USD))
    })

    test('Evaluate multiple currency with a non existing change rate', function (): void {
        const portfolio: Portfolio = new Portfolio()

        const bank: Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
        portfolio.add(Money.create(0.5, Currency.EUR))
        portfolio.add(Money.create(10, Currency.USD))

        const amount: Money = portfolio.evaluate(Currency.USD, bank)
        expect(amount).toEqual(Money.create(10.6, Currency.USD))
    })
})