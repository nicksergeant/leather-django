import { UPDATE_GLOBALS } from '../constants/action-types';

const initialState = {};

export default function globals(state = initialState, action) {
  switch (action.type) {

    case UPDATE_GLOBALS:
      return Object.assign({}, action.globals);

    default:
      return state;
  }
}
