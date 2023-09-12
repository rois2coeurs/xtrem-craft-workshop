# Concept

> Permet de changer le type de sa monnaire
> Permet d'ajouter, multiplier, diviser de l'argent

## Properties

- 
> Tableau de taux de changement des monnaies

## Responsibilities

- 

## Invariants

- 
> On ne peut convertir que si on a un taux de change entre la devise de départ et celle d'arrivée
> Sauf si la conversion ne change pas le type de monnaire
> On ne peut pas diviser par 0
> On ne peut pas ajouter deux money différentes

## Collaborators

- 
money : tuple d'un montant et d'une currency
