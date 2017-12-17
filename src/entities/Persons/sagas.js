// @flow

import { put, call, all, takeLatest } from 'redux-saga/effects';

import { actionTypes } from './actions';
import * as PersonsApi from './api';

function* fetchAllPersons() {
  try {
    const persons = yield call(PersonsApi.fetchAll);
    yield put({ type: actionTypes.REQUEST.FETCH.SUCCESS, persons });
  } catch (error) {
    yield put({ type: actionTypes.REQUEST.FETCH.ERROR, error });
  }
}

function* watchFetchAllPersons() {
  yield takeLatest(actionTypes.REQUEST.FETCH.START, fetchAllPersons);
}

export default function* (): Generator<any, any, any> {
  yield all([
    watchFetchAllPersons(),
  ]);
}
