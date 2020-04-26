import * as moment from 'moment';

export const getFullName = (parentFullName: string | undefined, name: string): string => {
  return `${parentFullName || ''} -> ${name}`;
};

export const diff = (from: moment.Moment | string | undefined, to: moment.Moment | string | undefined) => {
  if (!from || !to || from === null || to === null || !moment.isMoment(moment(from)) || !moment.isMoment(moment(to)))
    return 0;

  return moment(to).diff(moment(from));
};
