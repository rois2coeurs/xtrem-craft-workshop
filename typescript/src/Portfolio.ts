import {Bank} from "./Bank";
import {Currency} from "./Currency";
import {Money} from "./Money";

export class Portfolio {
    moneys: Money[] = [];

    evaluate(currency: Currency, bank: Bank): Money {
        let evaluateAmount: number = 0
        this.moneys.forEach((money) => {
            evaluateAmount += bank.convert(money, currency).amount;
        })
        return  Money.create(evaluateAmount, currency);
    }

    add(money: Money): void {
        let moneyExists : Money = this.moneys.find((m) => m.currency === money.currency)
        if (moneyExists) {
            moneyExists.add(money);
        } else {
            this.moneys.push(money);
        }
    }
}
