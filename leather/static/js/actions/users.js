import * as types from '../constants/action-types';

export function updateUser(user) {
  return { type: types.UPDATE_USER, user: user };
}
