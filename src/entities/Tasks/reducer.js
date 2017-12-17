// @flow

import { actionTypes } from './actions';

const initialState = [];

const timeline = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST.FETCH.SUCCESS:
      return action.tasks;

    default: return state;
  }
};

export default timeline;
