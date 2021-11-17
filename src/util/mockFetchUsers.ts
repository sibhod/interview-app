import { mockFetch } from 'util/mockFetch';
import mockUsersPayload from 'util/mockUsersPayload.json';
import { User } from 'types/User';

export const mockFetchUsers = (delay = 1000) =>
  mockFetch(mockUsersPayload as User[], delay);
