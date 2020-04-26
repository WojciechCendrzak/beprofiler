export const getFullName = (parentFullName: string | undefined, name: string): string => {
  return `${parentFullName || ''} -> ${name}`;
};

export const diff = (from: Date | null | undefined, to: Date | null | undefined) => {
  if (!from || !to || from === null || to === null || !isDate(from) || !isDate(to)) return 0;

  return to.getTime() - from.getTime();
};

const isDate = (value: Date | number | string) => {
  switch (typeof value) {
    case 'number':
      return true;
    case 'string':
      return !isNaN(Date.parse(value));
    case 'object':
      if (value instanceof Date) {
        return !isNaN(value.getTime());
      }
    default:
      return false;
  }
};
