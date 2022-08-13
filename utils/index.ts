import numeral from 'numeral';

/* eslint-disable sort-keys */
export enum CURRENCY_SYMBOLS {
  USD = '$',
  EUR = '€',
  GBP = '£',
  JPY = '¥',
  CAD = '$',
  AUD = '$',
  NZD = '$',
  CHF = 'Fr.',
  HKD = '$',
  SGD = '$',
  SEK = 'kr',
  DKK = 'kr',
  PLN = 'zł',
  NOK = 'kr',
  HUF = 'Ft',
  CZK = 'Kč',
  ISK = 'kr',
  BRL = 'R$',
  RUB = 'руб',
  TRY = '₺',
  PHP = '₱',
  ILS = '₪',
  INR = '₹',
  BGN = 'лв',
  IDR = 'Rp',
  KRW = '₩',
  MYR = 'RM',
  MXN = '$',
  CNY = '¥',
  THB = '฿',
  VND = '₫',
  RON = 'lei',
  LTL = 'Lt',
  ZAR = 'R',
}

export const formatCurrency = (value: number | string, currency: CURRENCY_SYMBOLS = CURRENCY_SYMBOLS.INR) =>
  numeral(value).format(`$ 0,0.00`).replace(/\$/, currency);
