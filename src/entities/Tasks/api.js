// @flow

import moment from 'moment';

const tasks = [
  {
    id: 1,
    userId: 1,
    project: 'ZZ-Theodo',
    client: 'ZZ-Congés',
    leave: true,
    startDate: moment('2017-10-31', 'YYYY-MM-DD'),
    endDate: moment('2018-12-15', 'YYYY-MM-DD'),
  },
  {
    id: 2,
    userId: 1,
    project: "Ask'IT",
    client: 'BNP ITG - Boost IT',
    leave: false,
    startDate: moment('2017-12-16', 'YYYY-MM-DD'),
    endDate: moment('2018-09-01', 'YYYY-MM-DD'),
  },
  {
    id: 9,
    userId: 2,
    project: 'Echoline',
    client: 'Echoline',
    leave: false,
    startDate: moment('2017-12-15', 'YYYY-MM-DD'),
    endDate: moment('2018-08-11', 'YYYY-MM-DD'),
  },
  {
    id: 3,
    userId: 2,
    project: 'Allomatch',
    client: 'Allomatch',
    leave: false,
    startDate: moment('2017-09-18', 'YYYY-MM-DD'),
    endDate: moment('2018-10-23', 'YYYY-MM-DD'),
  },
  {
    id: 4,
    userId: 2,
    project: 'WEFA',
    client: 'Safran',
    leave: false,
    startDate: moment('2017-12-25', 'YYYY-MM-DD'),
    endDate: moment('2018-10-16', 'YYYY-MM-DD'),
  },
  {
    id: 5,
    userId: 2,
    project: 'B2B',
    client: 'Fundshop',
    leave: false,
    startDate: moment('2017-11-09', 'YYYY-MM-DD'),
    endDate: moment('2018-10-30', 'YYYY-MM-DD'),
  },
  {
    id: 6,
    userId: 3,
    project: 'Projet Confidentiel',
    client: 'SG - ITIM',
    leave: false,
    startDate: moment('2017-08-07', 'YYYY-MM-DD'),
    endDate: moment('2018-10-30', 'YYYY-MM-DD'),
  },
  {
    id: 7,
    userId: 3,
    project: 'Projet Confidentiel #2',
    client: 'SG - ITIM',
    leave: false,
    startDate: moment('2017-08-07', 'YYYY-MM-DD'),
    endDate: moment('2018-10-30', 'YYYY-MM-DD'),
  },
  {
    id: 8,
    userId: 4,
    project: 'Fast IT - Filgood',
    client: 'Fast IT',
    leave: false,
    startDate: moment('2017-08-07', 'YYYY-MM-DD'),
    endDate: moment('2018-10-30', 'YYYY-MM-DD'),
  },
  {
    id: 10,
    userId: 5,
    project: 'Robo Mroning Star',
    client: 'BNP AM',
    leave: false,
    startDate: moment('2017-08-07', 'YYYY-MM-DD'),
    endDate: moment('2018-10-30', 'YYYY-MM-DD'),
  },
  {
    id: 11,
    userId: 5,
    project: 'Gouvernance',
    client: 'BNP AM',
    leave: false,
    startDate: moment('2017-08-07', 'YYYY-MM-DD'),
    endDate: moment('2018-10-30', 'YYYY-MM-DD'),
  },
];

export type Task = {
  +id: number,
  userId: number,
  project: string,
  client: string,
  leave: boolean,
  startDate: moment,
  endDate: moment,
};

export function fetchAll(): Task[] {
  return tasks;
}
