import {Currency} from "./Currency";
import {Bank} from "./Bank";

export class BankBuilder {
    private pivotCurrencry: Currency;
    private exchangeRates: Array<{currency: Currency, rate: number}> = Array<{currency: Currency, rate: number}>();

    static aBank() : BankBuilder {
        return new BankBuilder();
    }

    withPivotCurrency(currency: Currency) : BankBuilder {
        this.pivotCurrencry = currency;
        return this;
    }

    withExchangeRate(currency: Currency, rate: number) : BankBuilder {
        this.exchangeRates.push({currency:currency, rate:rate});
        return this;
    }

    build() : Bank {
        const bank = new Bank();
        this.exchangeRates.forEach(exchangeRate => {
            bank.addExchangeRate(this.pivotCurrencry, exchangeRate.currency, exchangeRate.rate);
            bank.addExchangeRate(exchangeRate.currency, this.pivotCurrencry, 1 / exchangeRate.rate);
        });
        return bank;
    }
}