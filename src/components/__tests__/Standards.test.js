
import 'jest-styled-components';
import moment from 'moment';
import React from 'react';
import renderer from 'react-test-renderer';

import Standards from '../Standards/Standards.component';

describe('Standards test suites', () => {
  const user = {
    id: 1,
    username: 'benjaming',
    standards: {
      projects: 1,
    },
  };

  it('should render a grey line if there is no standard violation', () => {
    const weeks = [moment('2017-08-14')];
    const weeklyTasksCount = {
      33: user.standards.projects,
    };

    const standards = renderer.create(
      <Standards tasks={[]} user={user} weeks={weeks} weeklyTasksCount={weeklyTasksCount} />
    ).toJSON();
    expect(standards).toMatchSnapshot();
  });

  it('should render a red line if there is a standard violation', () => {
    const weeks = [moment('2017-08-14')];
    const weeklyTasksCount = {
      33: user.standards.projects + 1,
    };

    const standards = renderer.create(
      <Standards tasks={[]} user={user} weeks={weeks} weeklyTasksCount={weeklyTasksCount} />
    ).toJSON();
    expect(standards).toMatchSnapshot();
  });
});
