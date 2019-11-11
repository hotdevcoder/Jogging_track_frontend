import { takeLatest } from 'redux-saga/effects'
import { DO_LOGIN, DO_SIGNUP} from 'redux/modules/auth'
import apiCall from '../api/apiCall'

const doLogin = apiCall({
  type: DO_LOGIN,
  method: 'post',
  path: () => '/auth/login/',
  success: (res, action) => {
    localStorage.setItem('jogging_tracker', JSON.stringify(res.data))
  }
})

const doSignup = apiCall({
  type: DO_SIGNUP,
  method: 'post',
  path: () => '/auth/register/',
  success: () => {
    localStorage.removeItem('jogging_tracker')
  },
  fail: () => {
    localStorage.removeItem('jogging_tracker')
  }
})


export default function* rootSaga () {
  yield takeLatest(DO_LOGIN, doLogin)
  yield takeLatest(DO_SIGNUP, doSignup)
}
