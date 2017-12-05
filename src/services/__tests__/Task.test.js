// @flow

import { calculateTaskWidth } from '../Task';

describe('Task service tests', () => {
  it('should return the length of a one week task', () => {
    const task = {
      startDate: '2017-10-01',
      endDate: '2017-10-08',
    };

    expect(calculateTaskWidth(task)).toBe(234);
  });
});
