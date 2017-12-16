// @flow

import { createRows } from '../Staffing';

describe('createRows tests', () => {
  it('should one row for one person', () => {
    const persons = [{
      id: 1,
      username: 'jonathanb',
      standards: {
        projects: 1,
      },
    }];
    const weeks = [...Array(10).keys()];
    const timeline = [
      {
        id: 1,
        userId: 1,
        project: null,
        client: null,
        leave: true,
        startDate: '2017-01-01',
        endDate: '2017-02-01',
      },
    ];

    expect(createRows(persons, timeline, weeks).length).toBe(1);
  });
});
