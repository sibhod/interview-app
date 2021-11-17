import { UserKey, UserTableSort } from 'types/User';

export const userColumnOrder: UserKey[] = [
  'full_name',
  'date_joined',
  'email',
  'country',
  // 'zip',
];

type ColumnStyle = {
  title: string;
  width?: string;
};

export const userColumnStyles: Partial<Record<UserKey, ColumnStyle>> = {
  full_name: { title: 'Name', width: '160px' },
  date_joined: { title: 'Join Date', width: '140px' },
  email: { title: 'Email Address', width: '200px' },
  country: { title: 'Country' },
};

export const tableGridTemplateColumns: string = userColumnOrder
  .map((k) => userColumnStyles[k]?.width ?? '1fr')
  .join(' ');

export const defaultSort: UserTableSort = {
  key: 'full_name',
  direction: 'desc',
};

export const getSortKey = (key: UserKey): UserKey => {
  const sortKeyMap: Partial<Record<UserKey, UserKey>> = {
    full_name: 'last_name',
  };

  return sortKeyMap[key] ?? key;
};

export const HEADER_HEIGHT = 36;
export const ROW_HEIGHT = 24;
