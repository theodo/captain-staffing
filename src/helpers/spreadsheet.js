import { tail } from 'lodash';

import config from '../config';

/**
 * Get the user authentication status
 */
export function checkAuth(immediate, callback) {
  window.gapi.auth.authorize({
    'client_id': config.clientId,
    'scope': config.scope,
    'immediate': immediate
  }, callback);
}

/**
 * Load the content from the spreadsheet
 */
export function load(callback) {

  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: config.spreadsheetId,
      range: 'Availability!A1:V23'
    }).then((response) => {
      const rows = response.result.values || [];
      const headers = rows[0];

      let peopleStaffing = tail(rows).map((row, i) => {
        return {
          name: row[0],
          values: tail(row),
        }
      });

      callback(headers, peopleStaffing);
    }, (response) => {
      callback(null, null, response.result.error);
    });
  });
}

/**
 * Update a single cell value
 */
export function updateCell(column, row, value, successCallback, errorCallback) {
  window.gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: config.spreadsheetId,
    range: 'Sheet1!' + column + row,
    valueInputOption: 'USER_ENTERED',
    values: [ [value] ]
  }).then(successCallback, errorCallback);
}
