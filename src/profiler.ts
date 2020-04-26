import { ProfilerSection } from './profiler-section';
import { getFullName } from './profiler.logic';

export class Profiler {
  sections: { [x: string]: ProfilerSection | undefined } = {};
  private currentSection?: ProfilerSection;

  enter(sectionName: string): void {
    const fullName = getFullName(this.currentSection?.name, sectionName);
    let item = this.sections[fullName];

    if (!item) {
      item = new ProfilerSection(sectionName, this.currentSection);
      this.sections[fullName] = item;
    }

    item.enter();
    this.currentSection = item;
  }

  leave(): void {
    if (!this.currentSection) return;

    if (this.currentSection && this.sections[this.currentSection.fullName]) {
      const item = this.sections[this.currentSection.fullName] as ProfilerSection;
      item.leave();
      this.currentSection = item.parent;
    }
  }

  getHeader(): string {
    return `${'Max(s)'}\t${'Avg(s)'}\t${'Min(s)'}\t${'Total(s)'}\t${'Count'}\t${'Section Name'}`;
  }

  getSummary(): string {
    let result = this.getHeader() + '\n';

    for (const key in this.sections) {
      if (this.sections.hasOwnProperty(key)) {
        const item = this.sections[key] as ProfilerSection;
        result += item.toString() + '\n';
      }
    }

    return result;
  }

  clear(): void {
    this.sections = {};
  }
}
