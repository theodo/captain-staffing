// @flow

import { actionTypes } from './actions';

const personsState = {};

const persons = (state = personsState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST.FETCH.SUCCESS:
      return action.persons;

    default:
      return state;
  }
};

export default persons;
