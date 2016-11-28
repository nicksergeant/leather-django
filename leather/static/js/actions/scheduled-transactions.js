import * as types from '../constants/action-types';

export function addScheduledTransaction(scheduledTransaction) {
  return { type: types.ADD_SCHEDULED_TRANSACTION, scheduledTransaction: scheduledTransaction };
}

export function deleteScheduledTransaction(scheduledTransaction) {
  return { type: types.DELETE_SCHEDULED_TRANSACTION, scheduledTransaction: scheduledTransaction };
}

export function updateScheduledTransaction(scheduledTransaction) {
  return { type: types.UPDATE_SCHEDULED_TRANSACTION, scheduledTransaction: scheduledTransaction };
}
