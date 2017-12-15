// @flow

import moment from 'moment';

/**
 * Generate a list of 20 weeks, from four weeks ago to 16 weeks in future.
 *
 * @return Array<moment>
 */
export function createWeeks(): Array<moment> {
  const weeks = [];
  for (let i = -4; i <= 16; i += 1) {
    if (i < 0) {
      weeks.push(moment().subtract(i * -1, 'w').startOf('week'));
    } else {
      weeks.push(moment().add(i, 'w').startOf('week'));
    }
  }

  return weeks;
}
