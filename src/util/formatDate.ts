const defaultOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};
const formatter = new Intl.DateTimeFormat('en-US', defaultOptions);

export const formatDate = (date: Date | number): string =>
  formatter.format(new Date(date));
