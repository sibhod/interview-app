import store from 'redux/store';
import { mockFetchUsers } from 'util/mockFetchUsers';
import { FETCH_USERS_REQUEST, FETCH_USERS_RESOLVE } from './action-types';

const { dispatch } = store;

export const fetchUsers = () => {
  dispatch({ type: FETCH_USERS_REQUEST });

  return mockFetchUsers().then((res) =>
    dispatch({
      type: FETCH_USERS_RESOLVE,
      payload: res,
    })
  );
};
