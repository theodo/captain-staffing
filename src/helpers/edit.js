import { findIndex, map } from 'lodash'

export function toggleByPeopleId(peopleId, data) {
  if (!peopleId) {
    return data
  }
  const index = findIndex(data, (row) => { return row.name === peopleId })

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
  return data
}
