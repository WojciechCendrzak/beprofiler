import * as moment from 'moment';
import { getFullName } from './profiler.logic';

export class ProfilerBlock {
  name: string;
  parent?: ProfilerBlock;
  min: number = Number.MAX_VALUE;
  max: number = 0;
  average: number = 0;
  triggerCount: number = 0;

  fullName: string;
  timeOnEnter?: moment.Moment;
  timeOnLeave?: moment.Moment;

  constructor(name: string, parent: ProfilerBlock | undefined) {
    this.name = name;
    this.parent = parent;
    this.fullName = getFullName(parent?.name, name);
  }

  enter(): void {
    this.timeOnEnter = moment();
    this.triggerCount++;
  }

  leave(): void {
    this.timeOnLeave = moment();
    const interval = moment.duration(this.timeOnLeave.diff(this.timeOnEnter)).milliseconds();

    if (interval < this.min) {
      this.min = interval;
    }

    if (interval > this.max) {
      this.max = interval;
    }

    this.average = (this.average * (this.triggerCount - 1) + interval) / this.triggerCount;
  }

  getImplantation(): number {
    return this.parent !== undefined ? this.parent.getImplantation() + 1 : 0;
  }

  toString(): string {
    let implantation = '';

    for (let i = 0; i < this.getImplantation(); i++) {
      implantation = implantation + '  ';
    }

    const maxs = this.max / 1000;
    const avgs = this.average / 1000;
    const mins = this.min === Number.MAX_VALUE ? 0 : this.min / 1000;
    const total = (this.average * this.triggerCount) / 1000;
    const blockName = implantation + this.name;

    return (
      `${maxs.toFixed(3)}\t${avgs.toFixed(3)}\t${mins.toFixed(3)}\t${total.toFixed(3)}\t` +
      `${this.triggerCount}\t\t${blockName}`
    );
  }
}
