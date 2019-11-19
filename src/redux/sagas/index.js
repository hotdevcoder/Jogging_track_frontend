import { all } from 'redux-saga/effects'
import auth from './auth'
import user from './user'
import tracking from './tracking'

export default function* rootSaga () {
  yield all([
    auth(),
    user(),
    tracking()
  ])
}