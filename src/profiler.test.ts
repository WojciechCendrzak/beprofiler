import { Profiler } from './profiler';

describe('Profiler should work properly', () => {
  const profiler = new Profiler();
  test('Should enter and leave', () => {
    expect(() => {
      profiler.enter('some code block');
      profiler.enter('some internal block');
      profiler.leave();
      profiler.leave();
    }).not.toThrow();
  });
});
