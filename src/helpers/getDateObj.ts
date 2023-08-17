import { IDate } from '../types/date.ts';

export const getDateObj = (date: Date, isDay?: boolean): IDate => {
  const dateKeys = date.toLocaleDateString().split('.');

  return isDay
    ? { year: +dateKeys[2], month: +dateKeys[1], day: +dateKeys[0]}
    : { year: +dateKeys[2], month: +dateKeys[1]};
}