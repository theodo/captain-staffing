import { tail, forEach, head, map, groupBy } from 'lodash'
import moment from 'moment'

const unMergeCells = (data, columnIndex) => {
  var buffer = null
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
  var weeks = tail(tail(head(peopleResponse)))
  const staffingArray = unMergeCells(tail(peopleResponse), 0)
  const staffingByName = groupBy(staffingArray, (someoneStaffing) => {
    return someoneStaffing[0]
  })
  return map(staffingByName, (rows, name) => {
    var staffing = {}
    var projects = map(rows, row => row[1])
    forEach(weeks, (week, weekIndex) => {
      var weekStaffing = {}
      var total = 0
      forEach(rows, (row) => {
        weekStaffing[row[1]] = getFloat(row[weekIndex + 2])
        total += getFloat(row[weekIndex + 2])
      })
      weekStaffing._total = total
      const weekString = moment(week, 'DD/MM/YYYY').format('DD/MM')
      staffing[weekString] = weekStaffing
    })
    return {
      name: name,
      staffing: staffing,
      projects: projects,
    }
  })
}
