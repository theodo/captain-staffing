// @flow

import { actionTypes } from './actions';

const initialState = [];

const timeline = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST.FETCH.SUCCESS:
      return action.tasks;
    case actionTypes.REQUEST.ADD.START:
      return state.concat(action.task);

    default: return state;
  }
};

export default timeline;
