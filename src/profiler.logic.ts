import { isDate } from 'util';

export const getFullName = (parentFullName: string | undefined, name: string): string => {
  return `${parentFullName || ''} -> ${name}`;
};

export const diff = (from: Date | null | undefined, to: Date | null | undefined) => {
  if (!from || !to || from === null || to === null || !isDate(from) || !isDate(to)) return 0;

  return to.getTime() - from.getTime();
};
