// @flow

import moment from 'moment';

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
        project: 'Foo',
        client: 'Bar',
        leave: false,
        startDate: moment('2017-01-01', 'YYYY-MM-DD'),
        endDate: moment('2017-02-01', 'YYYY-MM-DD'),
      },
    ];

    expect(createRows(persons, timeline, weeks).length).toBe(1);
  });
});
