import * as types from '../constants/action-types';

export function addAccount(account) {
  return { type: types.ADD_ACCOUNT, account: account };
}

export function updateAccount(account) {
  return { type: types.UPDATE_ACCOUNT, account: account };
}
