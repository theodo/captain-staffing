// @flow

import { all } from 'redux-saga/effects';
import PersonsSagas from '../entities/Persons/sagas';

export default function* rootSaga() {
  yield all([
    PersonsSagas(),
  ]);
}
