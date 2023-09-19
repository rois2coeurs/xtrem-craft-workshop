import {Bank} from "../src/Bank";
import {Currency} from "../src/Currency";
import {MissingExchangeRateError} from "../src/MissingExchangeRateError";

class Portfolio {
    money: Map<Currency, number> = new Map()

    evaluate(currency: Currency, bank: Bank): number {
        let accu: number = 0
        let key : Currency
        for (key of this.money.keys()) {
            accu += bank.convert(this.money.get(key), key, currency )
        }
        return accu
    }

    add(number: number, currency: Currency): void {
        this.money.has(currency) ?
            this.money.set(currency, this.money.get(currency) + number) :
            this.money.set(currency, number)
    }
}

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

        const amount: number = portfolio.evaluate(Currency.EUR, bank)
        expect(amount).toBe(15)
    })

    test('Evaluate multiple currency with one already in the portfolio', function (): void {
        const portfolio: Portfolio = new Portfolio()

        const bank: Bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
        portfolio.add(10, Currency.EUR)
        portfolio.add(10, Currency.USD)

        const amount: number = portfolio.evaluate(Currency.USD, bank)
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
})