export type SortDirection = 'asc' | 'desc';

export type Sort<SortKey extends string> = {
  key: SortKey;
  direction: SortDirection;
};

export const getOppositeDirection = (dir: SortDirection) =>
  dir === 'asc' ? 'desc' : 'asc';
