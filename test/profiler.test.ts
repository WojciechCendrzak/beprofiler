import * as moment from 'moment';
import { Profiler } from '../src/profiler';
import { now } from '../src/profiler.service';

jest.mock('./date-time.service', () => ({
  now: jest.fn(),
}));

describe('Profiler should work properly', () => {
  test('Should enter and leave', () => {
    expect(() => {
      const profiler = new Profiler();
      (now as jest.Mock).mockImplementation(() => moment());

      profiler.enter('code_block');
      profiler.enter('some internal block');
      profiler.leave();
      profiler.leave();
    }).not.toThrow();
  });

  test('Should get simply summary', () => {
    const profiler = new Profiler();
    (now as jest.Mock)
      .mockImplementationOnce(() => moment('2020-01-01T00:00:00.000Z'))
      .mockImplementationOnce(() => moment('2020-01-01T00:00:01.000Z'));

    profiler.enter('code_block');
    profiler.leave();

    expect(profiler.getSummary()).toEqual(
      `Max(s)	Avg(s)	Min(s)	Total(s)	Count	Block Name
1.000	1.000	1.000	1.000	1	code_block
`
    );
  });

  test('Should get inner block summary', () => {
    const profiler = new Profiler();
    (now as jest.Mock)
      .mockImplementationOnce(() => moment('2020-01-01T00:00:00.000Z'))
      .mockImplementationOnce(() => moment('2020-01-01T00:00:01.000Z'))
      .mockImplementationOnce(() => moment('2020-01-01T00:00:02.000Z'))
      .mockImplementationOnce(() => moment('2020-01-01T00:00:10.000Z'));

    profiler.enter('outer_block');
    profiler.enter('inner_block');
    profiler.leave();
    profiler.leave();

    expect(profiler.getSummary()).toEqual(
      `Max(s)	Avg(s)	Min(s)	Total(s)	Count	Block Name
10.000	10.000	10.000	10.000	1	outer_block
1.000	1.000	1.000	1.000	1	  inner_block
`
    );
  });
  test('Should get 2 inner block summary', () => {
    const profiler = new Profiler();
    (now as jest.Mock)
      .mockImplementationOnce(() => moment('2020-01-01T00:00:00.000Z'))
      .mockImplementationOnce(() => moment('2020-01-01T00:00:00.000Z'))
      .mockImplementationOnce(() => moment('2020-01-01T00:00:01.000Z'))
      .mockImplementationOnce(() => moment('2020-01-01T00:00:02.000Z'))
      .mockImplementationOnce(() => moment('2020-01-01T00:00:04.000Z'))
      .mockImplementationOnce(() => moment('2020-01-01T00:00:10.000Z'));

    profiler.enter('outer_block');
    profiler.enter('inner_block');
    profiler.leave();
    profiler.enter('inner_block');
    profiler.leave();
    profiler.leave();

    expect(profiler.getSummary()).toEqual(
      `Max(s)	Avg(s)	Min(s)	Total(s)	Count	Block Name
10.000	10.000	10.000	10.000	1	outer_block
2.000	1.500	1.000	3.000	2	  inner_block
`
    );
  });
});
