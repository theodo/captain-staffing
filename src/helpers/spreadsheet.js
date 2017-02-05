import { tail, head, concat, unionBy, forEach } from 'lodash'

import config from '../configs/config'
import { buildStaffing, removePastWeeks } from './formatter'

/**
 * Get the user authentication status
 */
export function checkAuth(immediate, callback) {
  window.gapi.auth.authorize(
    {
      client_id: config.clientId,
      scope: config.scope,
      immediate,
    },
    callback
  )
}

/**
 * Load the content from the spreadsheet
 */
export function load(callback) {
  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values.get(
      {
        spreadsheetId: config.spreadsheetId,
        range: 'People!A:V',
      }
    ).then(
      (response) => {
        const rows = response.result.values || []

        let weeks = tail(tail(head(rows)))
        const peopleStaffing = buildStaffing(response.result.values)

        weeks = removePastWeeks(weeks)

        callback(weeks, peopleStaffing)
      },
      (response) => {
        callback(null, null, response.result.error)
      }
    )
  })
}

const peopleStaffingToList = (peopleStaffing) => {
  const lines = []
  forEach(peopleStaffing, (someoneStaffing) => {
    if (someoneStaffing.name === '' && someoneStaffing.name !== 'Total général') {
      return
    }
    forEach(someoneStaffing.staffing, (weekStaffing, week) => {
      forEach(weekStaffing, (projectStaffing, projectName) => {
        if (projectName[0] !== '_' && projectStaffing !== undefined) {
          // if (someoneStaffing.name === 'jeanremib') {
          //   console.log(projectName, weekStaffing)
          // }
          lines.push([
            someoneStaffing.name,
            projectName,
            week,
            projectStaffing || '',
          ])
        }
      })
    })
  })
  return lines
}

export function update(peopleStaffing, callback) {
  window.gapi.client.load('sheets', 'v4', () => {
    const promise = window.gapi.client.sheets.spreadsheets.values.get(
      {
        spreadsheetId: config.spreadsheetId,
        range: 'Staffing list!A:D',
      }
    )
    const localList = peopleStaffingToList(peopleStaffing)
    promise.then(
      (response) => {
        const rows = response.result.values || []
        const values = unionBy(localList, tail(rows), (line) => {
          return `${line[0]}-${line[1]}-${line[2]}`
        })

        return window.gapi.client.sheets.spreadsheets.values.update(
          {
            spreadsheetId: config.spreadsheetId,
            range: 'Staffing list!A:D',
            majorDimension: response.result.majorDimension,
            valueInputOption: 'USER_ENTERED',
            values: concat([head(rows)], values),
          }
        )
      },
      (response) => {
        callback(null, null, response.result.error)
      }
    )
  })
}
