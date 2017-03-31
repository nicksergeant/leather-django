import { ADD_ACCOUNT, UPDATE_ACCOUNT } from '../constants/action-types';

const initialState = [];

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case ADD_ACCOUNT:
      return [
        ...state,
        Object.assign({}, action.account)
      ];

    case UPDATE_ACCOUNT:
      return state.map(account =>
        account.id === action.account.id ?
          Object.assign({}, action.account) : account
      );

    default:
      return state;
  }
}
