import * as types from '../constants/action-types';

export function updateGlobals(globals) {
  return { type: types.UPDATE_GLOBALS, globals: globals };
}
