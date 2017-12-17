// @flow

import { all } from 'redux-saga/effects';
import PersonsSagas from '../entities/Persons/sagas';
import TasksSagas from '../entities/Tasks/sagas';

export default function* rootSaga(): Generator<any, any, any> {
  yield all([
    PersonsSagas(),
    TasksSagas(),
  ]);
}
