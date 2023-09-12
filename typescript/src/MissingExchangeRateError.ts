import { Currency } from './Currency'

export class MissingExchangeRateError extends Error {
  constructor (current: Currency, target: Currency) {
    super(current + '-> ' + target)
  }

  message: string
}
