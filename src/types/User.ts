import { Sort } from 'types/Sort';

export type User = {
  first_name: string;
  full_name: string;
  last_name: string;
  description: string;
  zip: number;
  email: string;
  country: string;
  date_joined: number;
};

export type UserKey = keyof User;

export type UserTableSort = Sort<UserKey>;
