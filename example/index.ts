import { Profiler } from 'beprofiler';

const profiler = new Profiler();

profiler.enter('Some name');

profiler.leave();

console.log(profiler.getSummary());
