import { tail, forEach, head, map, groupBy } from 'lodash'
import moment from 'moment'

const unMergeCells = (data, columnIndex) => {
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

const getFloat = (string) => {
  if (string) {
    return parseFloat(string.replace(',', '.'))
  }
  return 0
}

export function buildStaffing(peopleResponse) {
  const weeks = tail(tail(head(peopleResponse)))
  const staffingArray = unMergeCells(tail(peopleResponse), 0)
  const staffingByName = groupBy(staffingArray, (someoneStaffing) => {
    return someoneStaffing[0]
  })
  return map(staffingByName, (rows, name) => {
    const staffing = {}
    const projects = map(rows, (row) => { return row[1] })
    forEach(weeks, (week, weekIndex) => {
      const weekStaffing = {}
      let total = 0
      forEach(rows, (row) => {
        weekStaffing[row[1]] = getFloat(row[weekIndex + 2])
        total += getFloat(row[weekIndex + 2])
      })
      weekStaffing._total = total
      const weekString = moment(week, 'DD/MM/YYYY').format('DD/MM')
      staffing[weekString] = weekStaffing
    })
    return {
      name,
      staffing,
      projects,
    }
  })
}
