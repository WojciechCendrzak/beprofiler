import { createAndFillArray, createAndFillArrayNTimes } from './logic';
import { profiler } from './profiler';

profiler.enter('createAndFillArray');
createAndFillArray(10000000);
profiler.leave();

profiler.enter('createAndFillArrayNTimes');
createAndFillArrayNTimes(3, 10000000);
profiler.leave();

console.log(profiler.getSummary());
