import {Currency} from "./Currency";
import {NegativeMoneyError} from "./errors/NegativeMonneyError";
import {DivideByZeroError} from "./errors/DivideByZeroError";
import {MissMatchCurrencyError} from "./errors/MissMatchCurrencyError";
import {number} from "fp-ts";
import {InfiniteMoneyError} from "./errors/InfiniteMoneyError";

export class Money {
    private readonly _amount: number;
    private readonly _currency: Currency

    private constructor(amount: number, currency: Currency) {
        this._amount = amount;
        this._currency = currency;
    }

    static create(amount: number, currency: Currency): Money {
        if (amount < 0) {throw new NegativeMoneyError(amount)}
        if (amount >= Infinity) {throw new InfiniteMoneyError()}
        return new Money(amount, currency);
    }

    get currency(): Currency {
        return this._currency;
    }

    get amount(): number {
        return this._amount;
    }

    add(add: Money): Money{
        if (this._currency !== add.currency) throw new MissMatchCurrencyError();
        return Money.create(this._amount + add.amount, this._currency);
    }

    times(time: number): Money {
        return Money.create(this._amount * time, this._currency);
    }

    divide(divide: number): Money {
        if (divide == 0) throw new DivideByZeroError();
        return Money.create(this._amount / divide, this._currency);
    }

    hasCurrency(currency: Currency) {
        return this.currency === currency;
    }

    convert(exchangeRate: number, target: Currency) {
        return Money.create(this._amount * exchangeRate, target);
    }
}

