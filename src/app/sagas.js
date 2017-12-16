// @flow

import { all } from 'redux-saga/effects';
import PersonsSagas from '../entities/Persons/sagas';
import TasksSagas from '../entities/Tasks/sagas';

export default function* rootSaga() {
  yield all([
    PersonsSagas(),
    TasksSagas(),
  ]);
}
