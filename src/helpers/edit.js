import { findIndex, map, isString, reduce, forEach, concat } from 'lodash'
import mapPartial from 'lodash/fp/map'
import sortBy from 'lodash/fp/sortBy'
import flow from 'lodash/fp/flow'
import moment from 'moment'

export function toggleByPeopleRow(peopleRow, data) {
  if (!peopleRow) {
    return data
  }

  const index = findIndex(data, (row) => {
    return row.name === peopleRow.name || row.name === peopleRow._name
  })

  if (index !== -1) {
    if (data[index].isOpen) {
      data[index].isOpen = false
      data.splice(index + 1, data[index].projects.length)
    } else {
      const newRows = map(data[index].projects, (project) => {
        return {
          name: '',
          staffing: data[index].staffing,
          project,
          _name: data[index].name,
        }
      })

      data[index].isOpen = true
      data.splice(index + 1, 0, ...newRows)
    }
  }

  return data
}

export function select(week, rowIndex, data, shiftKey, ctrlKey) {
  if (ctrlKey) {
    data[rowIndex].staffing[week]._selected = data[rowIndex].project
    return data
  }

  // weeks as moment object ordered
  const weeks = flow(
    mapPartial((w) => {
      return moment(w, 'DD/MM/YYYY').format('YYYYMMDD')
    }),
    sortBy((w) => { return w }),
    mapPartial((w) => {
      return moment(w)
    })
  )(Object.keys(data[rowIndex].staffing))

  if (shiftKey) {
    let pastWeekSelected = false
    const mWeek = moment(week, 'DD/MM/YYYY')
    forEach(weeks, (w) => {
      const selected = data[rowIndex].staffing[w.format('DD/MM/YYYY')]._selected
      if (selected) {
        pastWeekSelected = true
      }
      if (pastWeekSelected && w.isBefore(mWeek)) {
        data[rowIndex].staffing[w.format('DD/MM/YYYY')]._selected = data[rowIndex].project
      }
    })
    data[rowIndex].staffing[week]._selected = data[rowIndex].project
    return data
  }

  forEach(weeks, (w) => {
    if (w.format('DD/MM/YYYY') !== week) {
      data[rowIndex].staffing[w.format('DD/MM/YYYY')]._selected = null
    }
  })
  if (data[rowIndex].staffing[week]._selected === data[rowIndex].project) {
    data[rowIndex].staffing[week]._selected = null
  } else {
    data[rowIndex].staffing[week]._selected = data[rowIndex].project
  }
  return data
}

const computeSum = (weekStaffing) => {
  return reduce(weekStaffing, (total, value, key) => {
    if (key[0] === '_') {
      return total
    }
    const float = parseFloat(value)
    if (float) {
      total += float
    }
    return total
  }, 0)
}

export function edit(data, key) {
  return map(data, (row) => {
    row.staffing = reduce(row.staffing, (aggregator, info, week) => {
      if (info._selected && info._selected === row.project) {
        if (key === 'Backspace') {
          info[info._selected] = null
        } else if (isString(info[info._selected])) {
          info[info._selected] += key
        } else {
          info[info._selected] = key
        }
        info._total = computeSum(info)
        aggregator[week] = info
      } else {
        aggregator[week] = info
      }
      return aggregator
    }, {})
    return row
  })
}

export function reset(data) {
  return map(data, (row) => {
    row.staffing = reduce(row.staffing, (aggregator, info, week) => {
      info._selected = null
      aggregator[week] = info
      return aggregator
    }, {})
    return row
  })
}
