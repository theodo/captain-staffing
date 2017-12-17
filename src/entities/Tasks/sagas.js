// @flow

import { put, call, all, takeLatest } from 'redux-saga/effects';

import { actionTypes } from './actions';
import * as TasksApi from './api';

function* fetchAllTasks() {
  try {
    const tasks = yield call(TasksApi.fetchAll);
    yield put({ type: actionTypes.REQUEST.FETCH.SUCCESS, tasks });
  } catch (error) {
    yield put({ type: actionTypes.REQUEST.FETCH.ERROR, error });
  }
}

function* watchFetchAllTasks() {
  yield takeLatest(actionTypes.REQUEST.FETCH.START, fetchAllTasks);
}

export default function* (): Generator<any, any, any> {
  yield all([
    watchFetchAllTasks(),
  ]);
}
