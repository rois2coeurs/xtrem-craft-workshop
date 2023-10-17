# Example Mapping

## Format de restitution
*(rappel, pour chaque US)*

```markdown
## Titre de l'US (post-it jaunes)

> Question (post-it rouge)

### Règle Métier (post-it bleu)

Exemple: (post-it vert)

- [ ] 5 USD + 10 EUR = 17 USD
```

Vous pouvez également joindre une photo du résultat obtenu en utilisant les post-its.

## Évaluation d'un portefeuille

## Portfolio
As a bank customer, I want to be able to add money in a portfolio so that I can evaluate the total amount in currency

### We can evaluate a currency in the same currency , without any exchange rate
 > Empty portfolio  
> Evaluate with currency EUR  
 > -> 0 EUR
 
> Empty portfolio  
> Add 10 EUR  
> Add 5 EUR  
> Evaluate EUR  
>  -> 15 EUR


### We can evaluate in  different currency if the exchange rate exist

> Bank  
>   Exchange rate USD -> KRW : 1.2  
>   Exchange rate USD -> EUR : 1.2  
>   
> Portfolio  
>   Add 5 EUR  
>   Add 2 USD  
> Evaluate EUR  
> -> 7.4 EUR

> *How should we handle the float*