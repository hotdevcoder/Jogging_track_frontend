import { takeLatest } from 'redux-saga/effects'
import { DO_LOGIN, DO_SIGNUP, GET_PROFILE, SAVE_PROFILE, DO_TOKEN } from 'redux/modules/auth'
import apiCall from '../api/apiCall'

const doToken = apiCall({
  type: DO_TOKEN,
  method: 'post',
  path: () => 'api/token/',
  success: (res, action) => {
    console.log(res);
    //localStorage.setItem('jogging_tracker', JSON.stringify(res.data.token))
    localStorage.setItem('jogging_tracker', JSON.stringify({
      token: res.data.access,
      info : null
    }))
  }
})

const doSignup = apiCall({
  type: DO_SIGNUP,
  method: 'post',
  path: () => '/api/signup/',
  success: () => {
    localStorage.removeItem('jogging_tracker')
  },
  fail: () => {
    localStorage.removeItem('jogging_tracker')
  }
})

const doSaveProfile = apiCall({
  type: SAVE_PROFILE,
  method: 'put',
  path: () => '/api/users/profile/',
  success: (res, action) => {
    localStorage.setItem('jogging_tracker', JSON.stringify({
      info: res.data,
      token: JSON.parse(localStorage.getItem('jogging_tracker')).token
    }))
  }
})

const doGetProfile = apiCall({
  type: GET_PROFILE,
  method: 'get',
  path: () => '/api/users/profile',
  success: (res, action) => {
    console.log("success get profile!")
    localStorage.setItem('jogging_tracker', JSON.stringify({
      token: JSON.parse(localStorage.getItem('jogging_tracker')).token,
      info : res.data
    }))
  }
})

const doLogin = function*(action){
  console.log(action)
  const { payload } = action
  console.log(payload.body)
  
  yield doToken({
    type: DO_TOKEN,
    payload: {
      body: payload.body
    }
  })

  yield doGetProfile({
    type: GET_PROFILE,
  })
}

export default function* rootSaga () {
  yield takeLatest(DO_LOGIN, doLogin)
  yield takeLatest(DO_SIGNUP, doSignup)
  yield takeLatest(GET_PROFILE, doGetProfile)
  yield takeLatest(SAVE_PROFILE, doSaveProfile)
  yield takeLatest(DO_TOKEN, doToken)
}
