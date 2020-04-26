import { getFullName, diff } from './profiler.logic';
import { now } from './profiler.service';

export class ProfilerSection {
  name: string;
  parent?: ProfilerSection;
  min: number = Number.MAX_VALUE;
  max: number = 0;
  average: number = 0;
  triggerCount: number = 0;

  fullName: string;
  timeOnEnter?: Date;
  timeOnLeave?: Date;

  constructor(name: string, parent: ProfilerSection | undefined) {
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

    const interval = diff(this.timeOnEnter, this.timeOnLeave);

    if (interval < this.min) {
      this.min = interval;
    }

    if (interval > this.max) {
      this.max = interval;
    }

    this.average = (this.average * (this.triggerCount - 1) + interval) / this.triggerCount;
  }

  getIndentation(): number {
    return this.parent !== undefined ? this.parent.getIndentation() + 1 : 0;
  }

  toString(): string {
    let implantation = '';

    for (let i = 0; i < this.getIndentation(); i++) {
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
