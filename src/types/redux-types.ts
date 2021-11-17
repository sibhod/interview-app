import { Action } from 'redux';

export type Payload<T extends any = undefined> = T extends undefined
  ? {}
  : { payload: T };

export type ActionWithPayload<T extends string> = Action<T> & { payload: any };

export type ActionHandler<State, Type extends string> = (
  state: State,
  action: ActionWithPayload<Type>
) => State;

export type ReducerMap<State, ActionTypes extends string> = {
  [Type in ActionTypes]: ActionHandler<State, Type>;
};
