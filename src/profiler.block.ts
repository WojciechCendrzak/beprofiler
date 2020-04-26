import * as moment from 'moment';
import { getFullName } from './profiler.logic';
import { now } from './profiler.service';

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
    this.timeOnEnter = now();
    this.triggerCount++;
  }

  leave(): void {
    this.timeOnLeave = now();

    const interval = this.timeOnLeave.diff(this.timeOnEnter);

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

    const resultArray = [
      maxs.toFixed(3),
      avgs.toFixed(3),
      mins.toFixed(3),
      total.toFixed(3),
      this.triggerCount,
      blockName,
    ];

    return resultArray.join('\t');
  }
}
