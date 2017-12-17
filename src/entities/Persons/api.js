// @flow

const persons = [
  {
    id: 1,
    username: 'jonathanb',
    standards: {
      projects: 1,
    },
  },
  {
    id: 2,
    username: 'maximet',
    standards: {
      projects: 1,
    },
  },
  {
    id: 3,
    username: 'stanislasb',
    standards: {
      projects: 2,
    },
  },
  {
    id: 4,
    username: 'clementrp',
    standards: {
      projects: 2,
    },
  },
  {
    id: 5,
    username: 'matthieua',
    standards: {
      projects: 2,
    },
  },
];

export type Person = {
  +id: number,
  username: string,
  standards: {
    projects: number,
  },
};

export function fetchAll(): Person[] {
  return persons;
}
