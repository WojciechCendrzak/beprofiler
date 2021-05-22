import { profiler } from './profiler';

export const createAndFillArray = (length: number) => new Array(length).fill(0);

export const createAndFillArrayNTimes = (times: number, length: number) => {
  for (let i = 0; i < times; i++) {
    profiler.enter('loop');
    createAndFillArray(length);
    profiler.leave();
  }
};
