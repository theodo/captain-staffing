import { orderBy } from 'lodash';
import { hash } from './utils';
import { get } from './localStorage';

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
      range: 'Availability!A2:A23'
    }).then((response) => {
      const peopleValues = response.result.values || [];

      let peopleStaffing = peopleValues.map((peopleValue, i) => {
        return {
          name: peopleValue[0]
        }
      });

      callback(peopleStaffing);
    }, (response) => {
      callback(false, response.result.error);
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
