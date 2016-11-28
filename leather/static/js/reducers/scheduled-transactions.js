import {
  ADD_SCHEDULED_TRANSACTION,
  DELETE_SCHEDULED_TRANSACTION,
  UPDATE_SCHEDULED_TRANSACTION
} from '../constants/action-types';

const initialState = [];

export default function scheduledTransactions(state = initialState, action) {
  switch (action.type) {

    case ADD_SCHEDULED_TRANSACTION:
      return [
        ...state,
        Object.assign({}, action.scheduledTransaction, {
          date: new Date(action.scheduledTransaction.date)
        })
      ];

    case DELETE_SCHEDULED_TRANSACTION:
      return state.filter(scheduledTransaction =>
        scheduledTransaction.id === action.scheduledTransaction.id ?
          false : scheduledTransaction);

    case UPDATE_SCHEDULED_TRANSACTION:
      return state.map(scheduledTransaction =>
        scheduledTransaction.id === action.scheduledTransaction.id ?
          Object.assign({},
            scheduledTransaction,
            action.scheduledTransaction,
            { date: new Date(action.scheduledTransaction.date) }
          ) : scheduledTransaction
      );

    default:
      return state;
  }
}
