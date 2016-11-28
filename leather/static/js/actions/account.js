import * as types from '../constants/action-types';

export function updateAccount(account) {
  return { type: types.UPDATE_ACCOUNT, account: account };
}
