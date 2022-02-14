import { DateTime } from 'luxon';

export const getDayFromSeconds = (date: number) => {
  const luxonDate = DateTime.fromSeconds(date, { zone: 'utc' });
  return luxonDate.weekdayShort;
}

export const getFullDate = () => {
  const date = DateTime.now();
  return `${date.weekdayLong} ${date.day} ${date.monthLong} ${date.year}`;
}