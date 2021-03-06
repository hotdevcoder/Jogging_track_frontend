import { takeLatest } from 'redux-saga/effects'
import { GET_RECORD, GET_RECORDS, CREATE_RECORD, UPDATE_RECORD, DELETE_RECORD }
  from 'redux/modules/tracking'
import apiCall from '../api/apiCall'

const doGetRecord = apiCall({
  type: GET_RECORD,
  method: 'get',
  path: ({ payload }) => `/api/records/${payload.id}/`
})

const doGetRecords = apiCall({
  type: GET_RECORDS,
  method: 'get',
  path: () => `/api/records/`,
  //payloadOnSuccess: (res, { payload }) => ({
    // ...res,
    // ...pick(get(payload, 'params', {}), ['from', 'to', 'page', 'page_size']),
  //}),
  success: (res, action) => {
    console.log(res)
  }
})

const doCreateRecord = apiCall({
  type: CREATE_RECORD,
  method: 'post',
  path: () => `/api/records/`
})

const doUpdateRecord = apiCall({
  type: UPDATE_RECORD,
  method: 'put',
  path: ({ payload }) => `/api/records/${payload.id}/`
})

const doDeleteRecord = apiCall({
  type: DELETE_RECORD,
  method: 'delete',
  path: ({ payload }) => `/api/records/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id })
})

export default function* rootSaga () {
  yield takeLatest(GET_RECORD, doGetRecord)
  yield takeLatest(GET_RECORDS, doGetRecords)
  yield takeLatest(CREATE_RECORD, doCreateRecord)
  yield takeLatest(UPDATE_RECORD, doUpdateRecord)
  yield takeLatest(DELETE_RECORD, doDeleteRecord)
}
