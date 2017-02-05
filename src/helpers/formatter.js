import { forEach, map, groupBy, isNumber, range, filter, tail, includes, uniqBy } from 'lodash'
import moment from 'moment'

export function getFloat(string) {
  if (string) {
    return parseFloat(string.replace(',', '.'))
  }
  return undefined
}

export function buildWeekStaffing(weekRows) {
  const weekStaffing = {}
  let total = 0
  let isStaffed = false

  forEach(weekRows, (row) => {
    const projectStaffing = getFloat(row[3])
    weekStaffing[row[1]] = projectStaffing

    if (isNumber(projectStaffing)) {
      isStaffed = true
      total += projectStaffing
    }
  })

  weekStaffing._total = isStaffed ? total : null
  return weekStaffing
}

export function buildStaffing(list) {
  const weeks = map(range(0, 19), (i) => {
    return moment().add(i, 'week').startOf('isoweek').format('DD/MM/YYYY')
  })
  const staffingByName = groupBy(tail(list), (row) => { return row[0] })

  return map(staffingByName, (rows, name) => {
    const staffing = {}
    forEach(weeks, (week) => {
      const weekRows = filter(rows, (row) => { return row[2] === week })
      staffing[week] = buildWeekStaffing(weekRows)
    })

    const projects = map(uniqBy(filter(rows, (row) => {
      return includes(weeks, row[2])
    }), (row) => { return row[1] }), (row) => {
      return row[1]
    })
    projects.push('')
    return {
      name,
      staffing,
      projects,
    }
  })
}
