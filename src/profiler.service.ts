import * as moment from 'moment';

export const now = () => moment();

export const diff = (from: moment.Moment | string | undefined, to: moment.Moment | string | undefined) => {
  if (!from || !to || from === null || to === null || !moment.isMoment(moment(from)) || !moment.isMoment(moment(to)))
    return 0;

  return moment(to).diff(moment(from));
};
