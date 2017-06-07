import { UPDATE_USER } from '../constants/action-types';

const initialState = {};

export default function users(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return Object.assign({}, action.user);

    default:
      return state;
  }
}
