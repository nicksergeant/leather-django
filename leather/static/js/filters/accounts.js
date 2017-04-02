import { MONTH_NAMES_SHORT } from '../constants/dates';

export function accountTransactions(account, transactions) {
  return transactions.filter((t) => {
    return t.account_id === account.id;
  });
}

export function balance(account, allTransactions) {
  if (!account) return;
  if (!allTransactions.length) return;

  const transactions = accountTransactions(account, allTransactions);

  if (!transactions.length) return;

  const amounts = transactions.map((transaction) => {
    return transaction.amount;
  });

  if (!amounts.length) return;

  const sum = amounts.reduce((acc, val) => {
    return parseFloat(acc) + parseFloat(val);
  });

  return niceNumber(Math.abs(sum).toFixed(2));
}

export function niceNumber(num) {
    return '$' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
