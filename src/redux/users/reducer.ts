import { User } from 'types/User';
import { ReducerMap, Payload } from 'types/redux-types';
import * as userActions from './action-types';
import { RecordValues } from 'types/RecordValues';
import { createReducer } from 'util/createReducer';

const {
  ADD_USER,
  DELETE_USER,
  FETCH_USERS_FAIL,
  FETCH_USERS_REQUEST,
  FETCH_USERS_RESOLVE,
} = userActions;

type UsersState = {
  isFetchingUsers: boolean;
  users?: User[];
};

type UsersActions = RecordValues<typeof userActions>;

const initialState: UsersState = {
  isFetchingUsers: false,
};

const reducerMap: ReducerMap<UsersState, UsersActions> = {
  [ADD_USER]: (state, payload) => state,

  [DELETE_USER]: (state, payload) => state,

  [FETCH_USERS_FAIL]: (state) => ({
    ...state,
    isFetchingUsers: false,
    users: [],
  }),
  [FETCH_USERS_REQUEST]: (state) => ({
    ...state,
    isFetchingUsers: true,
  }),
  [FETCH_USERS_RESOLVE]: (state, { payload: users }: Payload<User[]>) => ({
    ...state,
    isFetchingUsers: false,
    users,
  }),
};

const reducer = createReducer(initialState, reducerMap);

export default reducer;
