import { MONTH_NAMES_SHORT } from '../constants/dates';

export function availableBalance(account) {
  if (!account) return;

  const toCalc = [parseFloat(account.balance_current)];
  const sum = toCalc.reduce((a, b) => a + b);

  if (sum) return sum.toFixed(2);
}

export function transactionAmount(transaction) {
  const amount = transaction.amount;
  return amount >= 0 ? amount : Math.abs(amount).toFixed(2);
}

export function transactionClass(transaction) {
  return transaction.amount >= 0 ? 'debit' : 'credit';
}

export function transactionDay(transaction) {
  if (!transaction.date) return null;
  return transaction.date.getDate();
}

export function transactionMonth(transaction) {
  if (!transaction.date) return null;
  return MONTH_NAMES_SHORT[transaction.date.getMonth()];
}
