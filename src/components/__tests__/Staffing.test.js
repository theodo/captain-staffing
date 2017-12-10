import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import LeftBar from '../LeftBar';
import Planning from '../Planning';
import Staffing from '../Staffing/Staffing.component';
import TopBar from '../TopBar';

describe('Staffing test suites', () => {
  const users = [
    {
      id: 1,
      username: 'benjaming',
      standards: {
        projects: 1,
      },
    },
  ];

  const weeks = [
    moment('2017-08-07', 'YYYY-MM-DD'),
    moment('2017-08-14', 'YYYY-MM-DD'),
    moment('2017-08-21', 'YYYY-MM-DD'),
    moment('2017-08-28', 'YYYY-MM-DD'),
  ];

  const staffing = shallow(<Staffing users={users} weeks={weeks} timeline={[]} />);

  it('should render without throwing an error', () => {
    expect(staffing.find(LeftBar).length).toEqual(1);
    expect(staffing.find(Planning).length).toEqual(1);
    expect(staffing.find(TopBar).length).toEqual(1);
  });
});
