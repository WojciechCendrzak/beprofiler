import { ProfilerBlock } from './profiler-block';
import { getFullName } from './profiler.logic';

export class Profiler {
  items: { [x: string]: ProfilerBlock | undefined } = {};
  currentItem?: ProfilerBlock;

  enter(itemName: string): void {
    const fullName = getFullName(this.currentItem?.name, itemName);
    let item = this.items[fullName];

    if (!item) {
      item = new ProfilerBlock(itemName, this.currentItem);
      this.items[fullName] = item;
    }

    item.enter();
    this.currentItem = item;
  }

  leave(): void {
    if (!this.currentItem) return;

    if (this.currentItem && this.items[this.currentItem.fullName]) {
      const item = this.items[this.currentItem.fullName] as ProfilerBlock;
      item.leave();
      this.currentItem = item.parent;
    }
  }

  getHeader(): string {
    return `${'Max(s)'}\t${'Avg(s)'}\t${'Min(s)'}\t${'Total(s)'}\t${'Count'}\t${'Block Name'}`;
  }

  getSummary(): string {
    let result = this.getHeader() + '\n';

    for (const key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        const item = this.items[key] as ProfilerBlock;
        result += item.toString() + '\n';
      }
    }

    return result;
  }

  clear(): void {
    this.items = {};
  }
}
