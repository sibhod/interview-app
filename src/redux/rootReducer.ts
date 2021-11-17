import { combineReducers, Action } from 'redux';
import users from 'redux/users/reducer';

export const rootReducer = combineReducers({ users });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
