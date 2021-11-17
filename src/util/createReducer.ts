import { Action, Reducer } from 'redux';
import {
  ActionHandler,
  ActionWithPayload,
  ReducerMap,
} from 'types/redux-types';

export const createReducer = <S, A extends string>(
  initialState: S,
  reducerMap: ReducerMap<S, A>
): Reducer<S, Action<A>> => {
  const map = new Map<string, ActionHandler<S, A>>(Object.entries(reducerMap));

  return (state: S | undefined, action: Action<A>) => {
    state = state ?? initialState;
    const handler = map.get(action.type);
    return handler?.(state, action as ActionWithPayload<A>) ?? state;
  };
};
