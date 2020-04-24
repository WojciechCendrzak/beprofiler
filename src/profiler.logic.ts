export const getFullName = (parentFullName: string | undefined, name: string): string => {
  return `${parentFullName || ''} -> ${name}`;
};
