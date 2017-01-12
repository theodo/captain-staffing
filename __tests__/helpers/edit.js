import { toggleByPeopleRow } from 'helpers/edit'

describe('edit', () => {
  describe('toggleByPeopleRow', () => {
    const data = [
      {
        name: 'Monsieur X',
        projects: ['Projet 1', 'Projet 2'],
        staffing: {
          '01/01': { 'Projet 1': 1, 'Projet 2': 2 },
          '01/02': { 'Projet 1': 1, 'Projet 2': 2 },
        },
      },
      {
        name: 'Madame Y',
        projects: ['Projet 3', 'Projet 4'],
        staffing: {
          '01/01': { 'Projet 3': 3, 'Projet 4': 4 },
          '01/02': { 'Projet 3': 3, 'Projet 4': 4 },
        },
      },
    ]

    it('should return the same data if no row is provided', () => {
      expect(toggleByPeopleRow(undefined, data)).toEqual([
        {
          name: 'Monsieur X',
          projects: ['Projet 1', 'Projet 2'],
          staffing: {
            '01/01': { 'Projet 1': 1, 'Projet 2': 2 },
            '01/02': { 'Projet 1': 1, 'Projet 2': 2 },
          },
        },
        {
          name: 'Madame Y',
          projects: ['Projet 3', 'Projet 4'],
          staffing: {
            '01/01': { 'Projet 3': 3, 'Projet 4': 4 },
            '01/02': { 'Projet 3': 3, 'Projet 4': 4 },
          },
        },
      ])
    })

    it('should add the details of a closed row', () => {
      expect(toggleByPeopleRow({ name: 'Monsieur X' }, data)).toEqual([
        {
          isOpen: true,
          name: 'Monsieur X',
          projects: ['Projet 1', 'Projet 2'],
          staffing: {
            '01/01': { 'Projet 1': 1, 'Projet 2': 2 },
            '01/02': { 'Projet 1': 1, 'Projet 2': 2 },
          },
        },
        {
          _name: 'Monsieur X',
          name: '',
          project: 'Projet 1',
          staffing: {
            '01/01': { 'Projet 1': 1, 'Projet 2': 2 },
            '01/02': { 'Projet 1': 1, 'Projet 2': 2 },
          },
        },
        {
          _name: 'Monsieur X',
          name: '',
          project: 'Projet 2',
          staffing: {
            '01/01': { 'Projet 1': 1, 'Projet 2': 2 },
            '01/02': { 'Projet 1': 1, 'Projet 2': 2 },
          },
        },
        {
          name: 'Madame Y',
          projects: ['Projet 3', 'Projet 4'],
          staffing: {
            '01/01': { 'Projet 3': 3, 'Projet 4': 4 },
            '01/02': { 'Projet 3': 3, 'Projet 4': 4 },
          },
        },
      ])
    })

    it('should remove the details of a opened row', () => {
      expect(toggleByPeopleRow({ name: 'Monsieur X' }, data)).toEqual([
        {
          isOpen: false,
          name: 'Monsieur X',
          projects: ['Projet 1', 'Projet 2'],
          staffing: {
            '01/01': { 'Projet 1': 1, 'Projet 2': 2 },
            '01/02': { 'Projet 1': 1, 'Projet 2': 2 },
          },
        },
        {
          name: 'Madame Y',
          projects: ['Projet 3', 'Projet 4'],
          staffing: {
            '01/01': { 'Projet 3': 3, 'Projet 4': 4 },
            '01/02': { 'Projet 3': 3, 'Projet 4': 4 },
          },
        },
      ])
    })

    it('should return the data if a bad row is specified', () => {
      expect(toggleByPeopleRow({ name: 'Monsieur Z' }, data)).toEqual([
        {
          isOpen: false,
          name: 'Monsieur X',
          projects: ['Projet 1', 'Projet 2'],
          staffing: {
            '01/01': { 'Projet 1': 1, 'Projet 2': 2 },
            '01/02': { 'Projet 1': 1, 'Projet 2': 2 },
          },
        },
        {
          name: 'Madame Y',
          projects: ['Projet 3', 'Projet 4'],
          staffing: {
            '01/01': { 'Projet 3': 3, 'Projet 4': 4 },
            '01/02': { 'Projet 3': 3, 'Projet 4': 4 },
          },
        },
      ])
    })
  })
})
