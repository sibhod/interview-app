import { createSelector } from 'reselect';
import { RootState } from 'redux/rootReducer';

const usersState = (state: RootState) => state.users;

export const usersSelector = createSelector([usersState], ({ users }) => users);
export const isFetchingUsersSelector = createSelector(
  [usersState],
  ({ isFetchingUsers }) => isFetchingUsers
);
