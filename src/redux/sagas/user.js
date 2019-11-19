import { takeLatest } from 'redux-saga/effects'
import { GET_USER, GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER, GET_USER_REPORT } from 'redux/modules/user'
import apiCall from '../api/apiCall'

const doGetUser = apiCall({
  type: GET_USER,
  method: 'get',
  path: ({ payload }) => `api/users/${payload.id}/`
})

const doGetUsers = apiCall({
  type: GET_USERS,
  method: 'get',
  path: () => `api/users/`,
  // payloadOnSuccess: (res, { payload }) => ({
  //   ...res,
  //   ...pick(get(payload, 'params', {}), ['page', 'page_size']),
  // }),
  success: (res, action) => {
    console.log("DogetUsers sucess!", res.data)
  }
})

const doCreateUser = apiCall({
  type: CREATE_USER,
  method: 'post',
  path: () => `api/users/`
})

const doUpdateUser = apiCall({
  type: UPDATE_USER,
  method: 'put',
  path: ({ payload }) => `/api/users/${payload.id}/`
})

const doDeleteUser = apiCall({
  type: DELETE_USER,
  method: 'delete',
  path: ({ payload }) => `api/users/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id })
})

const doGetUserReport = apiCall({
  type: GET_USER_REPORT,
  method: 'get',
  path: ({ payload }) => `api/users/${payload.id}/report`
})

export default function* rootSaga () {
  yield takeLatest(GET_USER, doGetUser)
  yield takeLatest(GET_USERS, doGetUsers)
  yield takeLatest(CREATE_USER, doCreateUser)
  yield takeLatest(UPDATE_USER, doUpdateUser)
  yield takeLatest(DELETE_USER, doDeleteUser)
  yield takeLatest(GET_USER_REPORT, doGetUserReport)
}
