import { Promise } from 'bluebird';

Promise.config({
  cancellation: true,
});

export const mockFetch = <R extends any>(response: R, delay: number = 3000) =>
  Promise.delay(delay).then(() => Promise.resolve<R>(response));

export const mockFetchError = (message: string, delay: number = 3000) =>
  Promise.delay(delay).then(() => Promise.reject(new Error(message)));
