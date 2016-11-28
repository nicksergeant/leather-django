import { UPDATE_ACCOUNT } from '../constants/action-types';

const initialState = {};

export default function account(state = initialState, action) {
  switch (action.type) {

    case UPDATE_ACCOUNT:
      return Object.assign({}, action.account);

    default:
      return state;
  }
}
