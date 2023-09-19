### As a bank customer i want to be able to add money in a portfolio so that i can evaluate the total amount in a currency

> Que fait-on des arrondis ?

#### We can evaluate a currency in the same currency, without any exchange rate

Exemple:
```
5 USD + 10 EUR = 15 EUR
empty = 0 x
```

#### convertir dans != devises = ????

Exemple:
```
Bank:
    - 1 USD = 1.2 KRW
    - 1 USD = 1.2 EUR
Portfolio: 5 EUR + 2 USD
-> evaluate to EUR
-> 7,4 EUR
```