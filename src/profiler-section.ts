import { getFullName, diff } from './profiler.logic';
import { now } from './profiler.service';

export class ProfilerSection {
  public name: string;
  public fullName: string;
  public parent?: ProfilerSection;
  public triggerCount: number = 0;
  public minIntervalAsMilliseconds: number = Number.MAX_VALUE;
  public maxIntervalAsMilliseconds: number = 0;
  public avgIntervalAsMilliseconds: number = 0;

  public timeOnEnter?: Date;
  public timeOnLeave?: Date;

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

    if (interval < this.minIntervalAsMilliseconds) {
      this.minIntervalAsMilliseconds = interval;
    }

    if (interval > this.maxIntervalAsMilliseconds) {
      this.maxIntervalAsMilliseconds = interval;
    }

    this.avgIntervalAsMilliseconds =
      (this.avgIntervalAsMilliseconds * (this.triggerCount - 1) + interval) / this.triggerCount;
  }

  protected getIndentation(): number {
    return this.parent !== undefined ? this.parent.getIndentation() + 1 : 0;
  }

  toString(): string {
    let implantation = '';

    for (let i = 0; i < this.getIndentation(); i++) {
      implantation = implantation + '  ';
    }

    const maxs = this.maxIntervalAsMilliseconds / 1000;
    const avgs = this.avgIntervalAsMilliseconds / 1000;
    const mins = this.minIntervalAsMilliseconds === Number.MAX_VALUE ? 0 : this.minIntervalAsMilliseconds / 1000;
    const total = (this.avgIntervalAsMilliseconds * this.triggerCount) / 1000;
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
