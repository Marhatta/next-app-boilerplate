import {all,call,take} from 'redux-saga/effects';

import {appSagas} from './app/app.sagas';

export default function* rootSaga() {
    yield all([
        call(appSagas),
    ]);
}