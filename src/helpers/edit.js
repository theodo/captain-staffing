import { findIndex, map, isString, reduce } from 'lodash'

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

export function select(week, rowIndex, data) {
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
