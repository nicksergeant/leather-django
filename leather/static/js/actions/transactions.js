import * as types from '../constants/action-types';

export function addTransaction(transaction) {
  return { type: types.ADD_TRANSACTION, transaction: transaction };
}

export function updateTransaction(transaction) {
  return { type: types.UPDATE_TRANSACTION, transaction: transaction };
}
