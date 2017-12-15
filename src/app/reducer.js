// @flow

import { combineReducers } from 'redux';

import persons from '../entities/Persons/reducer';

/**
 * add all entities and components reducers here
 */
const rootReducer = combineReducers({
  persons,
});

export default rootReducer;
