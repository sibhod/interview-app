import { Action, Middleware } from 'redux';

export const passthroughMiddleware: Middleware =
  (store) => (next) => (action: Action<string>) =>
    next(action);
