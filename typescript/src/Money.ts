import {Currency} from "./Currency";

export class Money{
    private _amount: number;
    private _currency: Currency
    constructor(amount: number, currency: Currency) {
        this._amount = amount;
        this._currency = currency;
    }
    get currency(): Currency {
        return this._currency;
    }

    set currency(value: Currency) {
        this._currency = value;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }
}