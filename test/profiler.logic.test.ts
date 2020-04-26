import { diff } from '../src/profiler.logic';

describe(diff.name, () => {
  describe.each`
    from                                    | to                                      | expected
    ${undefined}                            | ${undefined}                            | ${0}
    ${undefined}                            | ${null}                                 | ${0}
    ${undefined}                            | ${''}                                   | ${0}
    ${undefined}                            | ${{}}                                   | ${0}
    ${undefined}                            | ${[]}                                   | ${0}
    ${null}                                 | ${undefined}                            | ${0}
    ${null}                                 | ${null}                                 | ${0}
    ${null}                                 | ${''}                                   | ${0}
    ${null}                                 | ${{}}                                   | ${0}
    ${null}                                 | ${[]}                                   | ${0}
    ${''}                                   | ${undefined}                            | ${0}
    ${''}                                   | ${null}                                 | ${0}
    ${''}                                   | ${''}                                   | ${0}
    ${''}                                   | ${{}}                                   | ${0}
    ${''}                                   | ${[]}                                   | ${0}
    ${{}}                                   | ${undefined}                            | ${0}
    ${{}}                                   | ${null}                                 | ${0}
    ${{}}                                   | ${''}                                   | ${0}
    ${{}}                                   | ${{}}                                   | ${0}
    ${{}}                                   | ${[]}                                   | ${0}
    ${[]}                                   | ${undefined}                            | ${0}
    ${[]}                                   | ${null}                                 | ${0}
    ${[]}                                   | ${''}                                   | ${0}
    ${[]}                                   | ${{}}                                   | ${0}
    ${[]}                                   | ${[]}                                   | ${0}
    ${new Date('2020-01-01T00:00:00.000Z')} | ${new Date('2020-01-01T00:00:00.000Z')} | ${0}
    ${new Date('2020-01-01T00:00:00.000Z')} | ${new Date('2020-01-01T00:00:00.001Z')} | ${1}
    ${new Date('2020-01-01T00:00:00.000Z')} | ${new Date('2020-01-01T00:00:00.002Z')} | ${2}
    ${new Date('2020-01-01T00:00:00.000Z')} | ${new Date('2020-01-01T00:00:01.000Z')} | ${1000}
    ${new Date('2020-01-01T00:00:00.000Z')} | ${new Date('2020-01-01T00:01:01.000Z')} | ${61000}
    ${new Date('2020-01-01T00:00:00.000Z')} | ${new Date('2020-01-01T00:10:00.000Z')} | ${600000}
    ${new Date('2020-01-01T00:00:00.000Z')} | ${new Date('2020-01-01T10:00:00.000Z')} | ${36000000}
    ${new Date('2007-01-28T00:00:00.000Z')} | ${new Date('2007-01-29T00:00:00.000Z')} | ${86400000}
    ${new Date('2020-01-01T00:00:00.000Z')} | ${new Date('2020-01-01T00:00:00.001Z')} | ${1}
  `('', ({ from, to, expected }) => {
    test(`date times from "${from}" to "${to}" should give ${expected} ms`, () => {
      expect(diff(from, to)).toBe(expected);
    });
  });
});
