import {Bank} from "../src/Bank";
import {Currency} from "../src/Currency";
import {MissingExchangeRateError} from "../src/errors/MissingExchangeRateError";
import {Money} from "../src/Money";
import {Portfolio} from "../src/Portfolio";

describe('Portfolio', function (): void {

    test('Empty Portfolio => 0 eur', function (): void {
        const portfolio: Portfolio = new Portfolio()

        const bank: Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
        const amount: number = portfolio.evaluate(Currency.EUR, bank)
        expect(amount).toBe(0)
    })

    test('One currency in Portfolio', function (): void {
        const portfolio: Portfolio = new Portfolio()
        const bank: Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
        portfolio.add(10, Currency.EUR)
        portfolio.add(5, Currency.EUR)

        const converted: Money = portfolio.evaluate(Currency.EUR, bank)
        expect(converted.amount).toBe(15)
    })

    test('Evaluate multiple currency with one already in the portfolio', function (): void {
        const portfolio: Portfolio = new Portfolio()

        const bank: Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
        portfolio.add(10, Currency.EUR)
        portfolio.add(10, Currency.USD)

        const amount: Money = portfolio.evaluate(Currency.USD, bank)
        expect(amount).toBe(22)
    })

    test('Evaluate multiple currency with a non existing change rate', function (): void {
        const portfolio: Portfolio = new Portfolio()

        const bank: Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
        portfolio.add(10, Currency.EUR)
        portfolio.add(10, Currency.USD)

        const action = () => portfolio.evaluate(Currency.KRW, bank)
        expect(action).toThrow(MissingExchangeRateError)
    })

    test('Evaluate multiple currency with a non existing change rate', function (): void {
        const portfolio: Portfolio = new Portfolio()

        const bank: Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
        portfolio.add(0, Currency.EUR)
        portfolio.add(10, Currency.USD)

        const amount: Money = portfolio.evaluate(Currency.USD, bank)
        expect(amount).toBe(10)
    })

    test('Evaluate multiple currency with a non existing change rate', function (): void {
        const portfolio: Portfolio = new Portfolio()

        const bank: Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
        portfolio.add(0.5, Currency.EUR)
        portfolio.add(10, Currency.USD)

        const amount: Money = portfolio.evaluate(Currency.USD, bank)
        expect(amount).toBe(10.6)
    })
})