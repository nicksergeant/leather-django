import {
  ADD_TRANSACTION,
  ADD_TRANSACTIONS,
  UPDATE_TRANSACTION
} from '../constants/action-types';

const initialState = [];

export default function transactions(state = initialState, action) {
  switch (action.type) {
    case ADD_TRANSACTION:
      return [
        ...state,
        Object.assign({}, action.transaction, {
          date: new Date(action.transaction.date)
        })
      ];

    case ADD_TRANSACTIONS:
      const transactionsToAdd = action.transactions.map((transaction) => {
        return Object.assign({}, transaction, {
          date: new Date(transaction.date)
        });
      });
      return state.concat(transactionsToAdd);

    case UPDATE_TRANSACTION:
      return state.map(transaction =>
        transaction.id === action.transaction.id ?
          Object.assign({},
            transaction,
            action.transaction,
            { date: new Date(action.transaction.date) }
          ) : transaction
      );

    default:
      return state;
  }
}
