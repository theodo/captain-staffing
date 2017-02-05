import { tail, forEach, head, map, groupBy, filter, isNumber } from 'lodash'
import moment from 'moment'

export function unMergeCells(data, columnIndex) {
  let buffer = null

  forEach(data, (row) => {
    if (row[columnIndex]) {
      buffer = row[columnIndex]
    } else {
      row[columnIndex] = buffer
    }
  })

  return data
}

export function getFloat(string) {
  if (string) {
    return parseFloat(string.replace(',', '.'))
  }
  return undefined
}

export function buildWeekStaffing(rows, weekIndex) {
  const weekStaffing = {}
  let total = 0
  let isStaffed = false

  forEach(rows, (row) => {
    const projectStaffing = getFloat(row[weekIndex + 2])
    weekStaffing[row[1]] = projectStaffing

    if (isNumber(projectStaffing)) {
      isStaffed = true
      total += projectStaffing
    }
  })

  weekStaffing._total = isStaffed ? total : null
  return weekStaffing
}

export function buildStaffing(peopleResponse) {
  const weeks = tail(tail(head(peopleResponse)))
  const staffingArray = unMergeCells(tail(peopleResponse), 0)
  const staffingByName = groupBy(staffingArray, (someoneStaffing) => {
    return someoneStaffing[0]
  })

  return map(staffingByName, (rows, name) => {
    const staffing = {}
    forEach(weeks, (week, weekIndex) => {
      const weekString = moment(week, 'DD/MM/YYYY').format('DD/MM/YYYY')
      staffing[weekString] = buildWeekStaffing(rows, weekIndex)
    })

    const projects = map(rows, (row) => {
      return row[1]
    })

    return {
      name,
      staffing,
      projects,
    }
  })
}

export function removePastWeeks(weeks) {
  return filter(weeks, (week) => {
    return moment(week, 'DD/MM/YYYY') > moment().subtract(7, 'days')
  })
}
