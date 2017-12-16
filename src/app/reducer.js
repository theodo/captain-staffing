// @flow

import { combineReducers } from 'redux';

import persons from '../entities/Persons/reducer';
import tasks from '../entities/Tasks/reducer';

/**
 * add all entities and components reducers here
 */
const rootReducer = combineReducers({
  persons,
  tasks,
});

export default rootReducer;
